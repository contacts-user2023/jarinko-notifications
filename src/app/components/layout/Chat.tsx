'use client';

import {Box, Button, Textarea, HStack, Center, Text, Spacer, Link} from '@chakra-ui/react';
import {useSession} from "next-auth/react";
import {useEffect, useRef, useState, ChangeEvent} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {arrayUnion, doc, DocumentData, getDoc, onSnapshot, setDoc, Timestamp} from "firebase/firestore";
import {db} from "@src/app/libs/firebaseConfig";
import {toJSTDateString, toJSTTimeString} from "@src/app/libs/dateFormatter";
import DateDivider from "@src/app/components/ui/DateDivider";
import OutgoingMessage from "@src/app/components/ui/OutgoingMessage";
import IncomingMessage from "@src/app/components/ui/IncomingMessage";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {decryptMessage, encryptMessage} from "@src/app/libs/encryption";
import NextLink from "next/link";

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
  const auth = getAuth();

  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>("");
  const [disabled, setDisabled] = useState(false);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null); // チャットウィンドウのためのref
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 初期読み込みフラグ

  useEffect(() => {
    if (!partnerName && currentUser) {
      if (toUid && currentUser?.isAdmin) {
        const docRef = doc(db, "users", toUid as string);
        getDoc(docRef).then(doc => setPartnerName(doc?.data()?.name || 'unknown'));
      } else {
        setPartnerName('管理者');
      }
    }

    if (toUid && !currentUser?.isAdmin) {
      setChats([]);
    } else if (currentUser) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const documentId = toUid || user.uid;
          const unsubscribe = onSnapshot(doc(db, "chat", documentId), (doc) => {
            if (doc?.data()) {
              // @ts-ignore
              setChats(doc.data()?.messages);
            } else {
            }
          });

          return () => unsubscribe();
        }
      })
    }
  }, [currentUser]);

  useEffect(() => {
    if(currentUser) {
      const documentId = toUid || currentUser?.uid;
      const rRef = doc(db, "chat_activities", documentId as string);
      const chatReceived = currentUser?.isAdmin ? {guest: false} : {host: false};
      setDoc(rRef, chatReceived).catch(e => console.log(e));
      fetch(`/api/chat/${documentId}`).then(v => console.log(v.ok));
    }

    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (chatWindowRef.current) {
      const chatWindowHeight = chatWindowRef.current.clientHeight;
      const windowHeight = window.innerHeight;
      // メッセージリストの高さがチャットウィンドウの高さを超えたらスクロール
      if (chatWindowHeight > windowHeight - 350) {
        endOfMessagesRef.current?.scrollIntoView({behavior: 'smooth'});
      }
    }
  }, [chats]);

  const needDivider = (currentMs: number, prevMs: number | null) => {
    if (prevMs === null) {
      return true;
    }

    const currentDate = toJSTDateString(currentMs);
    const prevDate = toJSTDateString(prevMs);

    return currentDate !== prevDate;
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const addMessage = async () => {
    if (!message || toUid && !currentUser?.isAdmin) {
      return false;
    }

    setDisabled(true);

    const documentId = toUid || currentUser?.uid;
    const ref = doc(db, "chat", documentId as string);
    const data = {
      uid: currentUser?.uid,
      message: encryptMessage(message),
      timestamp: Timestamp.now()
    };
    const rRef = doc(db, "chat_activities", documentId as string);
    const chatReceived = currentUser?.isAdmin ? {host: true} : {guest: true};
    try {
      await setDoc(ref, {messages: arrayUnion(data)}, {merge: true});
      await setDoc(rRef, chatReceived);
      setMessage("");
    } catch (e) {
      console.log(e);
    } finally {
      setDisabled(false);
    }
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
            <Box key={i}>
              {
                // 現在と前のタイムスタンプを使用してneedDividerを呼び出す
                i === 0 || needDivider(ms, chats[i - 1].timestamp.seconds * 1000) ? <DateDivider ms={ms}/> : null
              }
              {
                currentUser?.uid === tips.uid
                  ? <OutgoingMessage time={time} message={decryptMessage(tips.message)} received={!!tips?.received}/>
                  : <IncomingMessage time={time} message={decryptMessage(tips.message)}/>
              }
            </Box>
          )
        })
      }
      <Box ref={endOfMessagesRef}></Box>
      <form>
        <Center
          pt={2}
          pb="120px"
          position="fixed"
          zIndex="sticky"
          left={0}
          width="100%"
          bottom="0"
          bg="gray.50"
          borderTop="1px"
          borderColor="gray.200"
        >
          <HStack w="95%">
            <Textarea value={message} onChange={handleTextareaChange} bg="white" borderRadius="0.5rem" size="sm"
                      resize="none"/>
            <Button colorScheme="blue" onClick={addMessage} isDisabled={disabled}>
              <ReactIcon iconName="LuSend"/>
            </Button>
          </HStack>
        </Center>
      </form>
    </Box>
  );
}
