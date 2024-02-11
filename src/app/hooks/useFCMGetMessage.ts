'use client';

import {useEffect, useState} from "react";
import { useToast } from '@chakra-ui/react';
import {onMessage} from 'firebase/messaging';
import { getMessaging } from "firebase/messaging";
import {firebaseApp} from "@src/app/libs/firebaseConfig";

export const useFCMMessage = () => {
  const toast = useToast();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== undefined && !!firebaseApp && !processed) {
        const messaging = getMessaging();
        // メッセージの受信イベントのリスニング
        onMessage(messaging, (payload) => {
          console.log('メッセージが受信されました:', payload);

          toast({
            title: payload?.notification?.title,
            status: 'info',
            variant: 'subtle',
            duration: 5000,
            isClosable: true,
          })
        });
        setProcessed(true);
      }
    } catch(e) {
      console.log(e)
    }
  }, [firebaseApp]);
};
