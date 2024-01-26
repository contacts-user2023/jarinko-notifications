'use client';

import {useEffect, useState} from "react";
import {onMessage} from 'firebase/messaging';
import { getMessaging } from "firebase/messaging";
import {firebaseApp} from "@src/app/libs/firebaseConfig";

export const useFCMMessage = () => {
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== undefined && !!firebaseApp && !processed) {
        const messaging = getMessaging();
        // メッセージの受信イベントのリスニング
        onMessage(messaging, (payload) => {
          console.log('メッセージが受信されました:', payload);

          // メッセージの内容に応じた処理をここに追加
        });
        setProcessed(true);
      }
    } catch(e) {
      console.log(e)
    }
  }, [firebaseApp]);
};
