'use client';

import {useEffect, useState} from "react";
import {subscribeToken, unsubscribeToken} from "@src/app/libs/messaging";
import {useSession} from "next-auth/react";
import {getMessaging} from "firebase/messaging";
import {firebaseApp} from "@src/app/libs/firebaseConfig";

export const useSubscribeToken = () => {
  const {data: session} = useSession();
  const currentUser = session?.user;
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined && currentUser && firebaseApp && !processed) {
      try {
        const methodCalledTime = localStorage.getItem('methodCalledTime');
        const currentTime = new Date().getTime();
        const methodCallUid = localStorage.getItem('methodCallUid');

        let shouldSubscribe = !methodCalledTime || currentTime - parseInt(methodCalledTime) > 2592000000; // 2592000000ミリ秒 = 30日

        if(methodCallUid && currentUser?.uid !== methodCallUid) {
          shouldSubscribe = true;
          const methodCallToken = localStorage.getItem('methodCallToken') || '';
          unsubscribeToken(methodCallUid, methodCallToken);
        }

        if(shouldSubscribe) {
          const messaging = getMessaging();
          subscribeToken(messaging, currentUser?.uid).then(token => {
            if (token) {
              localStorage.setItem('methodCalledTime', currentTime.toString());
              localStorage.setItem('methodCallUid', currentUser?.uid);
              localStorage.setItem('methodCallToken', token || '');
            }
          });
        }
        setProcessed(true);
      } catch(e) {
        console.log(e);
      }
    }
  }, [firebaseApp, currentUser])
};
