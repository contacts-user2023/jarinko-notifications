'use client';

import {useEffect, useState} from "react";
import {onMessage} from 'firebase/messaging';
import { getMessaging } from "firebase/messaging";
import {firebaseApp} from "@src/app/libs/firebaseConfig";
import {useInfoToast} from "@src/app/hooks/useCustomToast";

export const useFCMMessage = () => {
  const infoToast = useInfoToast();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== undefined && !!firebaseApp && !processed) {
        const messaging = getMessaging();
        // メッセージの受信イベントのリスニング
        onMessage(messaging, (payload) => {
          console.log('メッセージが受信されました:', payload);

          infoToast(payload?.notification?.title as string);
        });
        setProcessed(true);
      }
    } catch(e) {
      console.log(e)
    }
  }, [firebaseApp]);
};
