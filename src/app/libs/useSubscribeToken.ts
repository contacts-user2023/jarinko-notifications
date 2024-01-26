'use client';

import {useEffect, useState} from "react";
import {subscribeToken} from "@src/app/libs/messaging";
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
        const messaging = getMessaging();
        const methodCalledTime = localStorage.getItem('methodCalledTime');
        const currentTime = new Date().getTime();

        if (!methodCalledTime || currentTime - parseInt(methodCalledTime) > 2592000000) { // 2592000000ミリ秒 = 30日
          subscribeToken(messaging, currentUser?.uid).then(result => {
            if (result) {
              localStorage.setItem('methodCalledTime', currentTime.toString());
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
