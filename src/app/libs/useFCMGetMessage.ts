'use client';

import {useEffect} from "react";
import {onMessage} from 'firebase/messaging';
import {messaging} from "@src/app/libs/firebaseConfig";

export const useFCMMessage = () => {
  useEffect(() => {
    // メッセージの受信イベントのリスニング
    onMessage(messaging, (payload) => {
      console.log('メッセージが受信されました:', payload);

      // メッセージの内容に応じた処理をここに追加
    });
  }, []);
};
