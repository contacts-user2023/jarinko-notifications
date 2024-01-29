'use client';

import {Box, HStack, VStack, Center, Text, Spacer, Link} from '@chakra-ui/react';
import {useSession} from "next-auth/react";
import {useEffect, useRef, useState, useCallback, Fragment} from "react";
import {arrayUnion, doc, onSnapshot, setDoc, Timestamp} from "firebase/firestore";
import {db} from "@src/app/libs/firebaseConfig";
import {toJSTDateString, toJSTTimeString} from "@src/app/libs/dateFormatter";
import DateDivider from "@src/app/components/ui/DateDivider";
import OutgoingMessage from "@src/app/components/ui/OutgoingMessage";
import IncomingMessage from "@src/app/components/ui/IncomingMessage";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {decryptMessage, encryptMessage} from "@src/app/libs/encryption";
import NextLink from "next/link";
import ChatInput from "@src/app/components/ui/ChatInput";

type Props = {
  toUid?: string
};

type Chat = {
  uid: string,
  timestamp: Timestamp,
  message: string,
  received?: boolean,
};

export default function Chat({toUid}: Props) {
  const {data: session} = useSession();
  const currentUser = session?.user;

  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [chatActivities, setChatActivities] = useState(false);
  const [hasNew, setHasNew] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null); // チャットウィンドウのためのref
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 初期読み込みフラグ
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollWindow = () => {
    if (!chats?.length) {
      return;
    }

    if (chatWindowRef.current) {
      const chatWindowHeight = chatWindowRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      // メッセージリストの高さがチャットウィンドウの高さを超えたらスクロール
      if (chatWindowHeight > windowHeight - 350) {
        endOfMessagesRef.current?.scrollIntoView();
      }
    }
  };

  const receivedChat = () => {
    scrollWindow();
    const documentId = toUid || currentUser?.uid;
    fetch(`/api/chat/${documentId}`).catch(e => console.log(e));
    const rRef = doc(db, "chat_activities", documentId as string);
    const chatReceived = currentUser?.isAdmin ? {guest: false} : {host: false};
    setDoc(rRef, chatReceived, {merge: true}).catch(e => console.log(e));
    setHasNew(false);
  };

  const onScroll = useCallback(() => {
    if (chatWindowRef?.current) {
      const {pageYOffset} = window;
      setShowScrollButton(pageYOffset < chatWindowRef.current.clientHeight - 1000);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, {passive: true});
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    if (!showScrollButton && hasNew) {
      receivedChat();
    }
  }, [showScrollButton]);

  useEffect(() => {
    if (chats?.length > 0 && isInitialLoad) {
      scrollWindow();
      setIsInitialLoad(false);
    }
  }, [chats]);

  useEffect(() => {
    const fetchPartnerName = async () => {
      if (!partnerName && currentUser) {
        if (toUid && currentUser.isAdmin) {
          const response = await fetch(`/api/users/${toUid}`);
          const user = await response.json();
          setPartnerName(user?.displayName || 'unknown');
        } else {
          setPartnerName('管理者');
        }
      }
    };
    fetchPartnerName();

    if (toUid && !currentUser?.isAdmin) {
      setChats([]);
    } else if (currentUser) {
      const documentId = toUid || currentUser?.uid;
      const unsubscribe = onSnapshot(doc(db, "chat", documentId), (doc) => {
        if (doc?.data()) {
          // @ts-ignore
          setChats(doc.data()?.messages);
        }
      });
      const unsubscribe2 = onSnapshot(doc(db, "chat_activities", documentId), (doc) => {
        if (doc?.data()) {
          // @ts-ignore
          setChatActivities(currentUser?.isAdmin ? doc.data()?.guest : doc.data()?.host);
        }
      });

      return () => {
        unsubscribe();
        unsubscribe2();
      }
    }
  }, [currentUser]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden" && currentUser && chatActivities) {
        if (!showScrollButton) {
          receivedChat();
        } else {
          setHasNew(true);
        }
      }
    };
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [chatActivities]);

  const needDivider = (currentMs: number, prevMs: number | null) => {
    if (prevMs === null) {
      return true;
    }

    const currentDate = toJSTDateString(currentMs);
    const prevDate = toJSTDateString(prevMs);

    return currentDate !== prevDate;
  };

  const addMessage = async (message: string) => {
    if (toUid && !currentUser?.isAdmin) {
      return false;
    }

    const documentId = toUid || currentUser?.uid;
    const ref = doc(db, "chat", documentId as string);
    const data = {
      uid: currentUser?.uid,
      message: encryptMessage(message),
      timestamp: Timestamp.now()
    };
    const rRef = doc(db, "chat_activities", documentId as string);
    const chatReceived = currentUser?.isAdmin ? {host: true} : {guest: true};
    const addChat = await setDoc(ref, {messages: arrayUnion(data)}, {merge: true});
    await setDoc(rRef, chatReceived, {merge: true});
    scrollWindow();
    fetch(`/api/push/${documentId}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({msg: message}),
    });
  };

  return (
    <Box ref={chatWindowRef}>
      <HStack
        pt="75px"
        pb={2}
        px={4}
        position="fixed"
        zIndex="dropdown"
        left={0}
        width="100%"
        top="0"
        bg="gray.50"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Link
          as={NextLink}
          href={currentUser?.isAdmin ? "/users" : "/contacts"}
          _hover={{
            textDecoration: 'none',
            opacity: '0.7'
          }}
        >
          <ReactIcon iconName="LuChevronLeft"/>
        </Link>
        <Text>{partnerName}</Text>
        <Spacer/>
      </HStack>
      {
        chats && chats.map((tips: Chat, i: number) => {
          const ms = tips.timestamp.seconds * 1000;
          const time = toJSTTimeString(ms);

          return (
            <Fragment key={i}>
              {
                // 現在と前のタイムスタンプを使用してneedDividerを呼び出す
                i === 0 || needDivider(ms, chats[i - 1].timestamp.seconds * 1000) ? <DateDivider ms={ms}/> : null
              }
              <Box>
                {
                  currentUser?.uid === tips.uid
                    ? <OutgoingMessage time={time} message={decryptMessage(tips.message)} received={!!tips?.received}/>
                    : <IncomingMessage time={time} message={decryptMessage(tips.message)}/>
                }
              </Box>
            </Fragment>
          )
        })
      }
      <Box ref={endOfMessagesRef}></Box>
      <form>
        <ChatInput onSendMessage={addMessage}/>
      </form>
      {
        showScrollButton &&
        <Center
          position="fixed"
          right="1rem"
          bottom="240px"
          p={2}
          pb={1}
          borderRadius="0.5rem"
          bg={hasNew ? "red.300" : "blue.400"}
          color="white"
          as="span"
          onClick={scrollWindow}
        >
          <VStack spacing={0}>
            <ReactIcon boxSize={6} iconName="LuArrowDownToLine"/>
            {hasNew && <Text>new!</Text>}
          </VStack>
        </Center>
      }
    </Box>
  );
}
