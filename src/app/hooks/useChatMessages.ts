'use client';

import {useEffect, useRef, useState, useCallback} from "react";
import {arrayUnion, doc, onSnapshot, setDoc, Timestamp} from "firebase/firestore";
import {db} from "@src/app/libs/firebaseConfig";
import {encryptMessage} from "@src/app/libs/encryption";
import {useSession} from "next-auth/react";

type Chat = {
  uid: string;
  timestamp: Timestamp;
  message: string;
  received?: boolean;
};

type UseChatMessagesProps = {
  toUid?: string;
};

const useChatMessages = ({toUid}: UseChatMessagesProps) => {
  const {data: session} = useSession();
  const currentUser = session?.user;

  const [partnerName, setPartnerName] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[] | null>(null);
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

  const handleScroll = useCallback(() => {
    if (chatWindowRef?.current) {
      const {pageYOffset} = window;
      setShowScrollButton(pageYOffset < chatWindowRef.current.clientHeight - 1000);
    }
  }, []);

  const handleInitialLoad = useCallback(() => {
    if (chats && chats?.length > 0 && isInitialLoad) {
      scrollWindow();
      setIsInitialLoad(false);
    }
  }, [chats, isInitialLoad]);

  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState !== "hidden" && currentUser && chatActivities) {
      if (!showScrollButton) {
        receivedChat();
      } else {
        setHasNew(true);
      }
    }
  }, [currentUser, chatActivities, showScrollButton]);

  const handlePartnerNameFetch = useCallback(async () => {
    if (!partnerName && currentUser) {
      if (toUid && currentUser.isAdmin) {
        const response = await fetch(`/api/users/${toUid}`);
        const user = await response.json();
        setPartnerName(user?.displayName || 'unknown');
      } else {
        setPartnerName('管理者');
      }
    }
  }, [partnerName, currentUser, toUid]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {passive: true});
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!showScrollButton && hasNew) {
      receivedChat();
    }
  }, [showScrollButton]);

  useEffect(() => {
    handleInitialLoad();
  }, [handleInitialLoad]);

  useEffect(() => {
    handlePartnerNameFetch();
  }, [handlePartnerNameFetch]);

  useEffect(() => {
    if (toUid && !currentUser?.isAdmin) {
      setChats([]);
    } else if (currentUser) {
      const documentId = toUid || currentUser?.uid;
      const unsubscribe = onSnapshot(doc(db, "chat", documentId), (doc) => {
        if (doc?.data()) {
          // @ts-ignore
          setChats(doc.data()?.messages || []);
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
    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleVisibilityChange]);

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

  return {
    chats,
    addMessage,
    hasNew,
    showScrollButton,
    scrollWindow,
    endOfMessagesRef,
    chatWindowRef
  };
};

export default useChatMessages;
