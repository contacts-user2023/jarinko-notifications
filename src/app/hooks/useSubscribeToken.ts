'use client';

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {firebaseApp} from "@src/app/libs/firebaseConfig";
import {subscribe, unsubscribe} from "@src/app/libs/pushNotification";
import {useErrorToast} from "@src/app/hooks/useCustomToast";

export const useSubscribeToken = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const {data: session} = useSession();
  const currentUser = session?.user;
  const errorToast = useErrorToast();
  const [isInitLoad, setIsInitLoad] = useState<boolean>(true);
  const [processed, setProcessed] = useState<boolean>(false);
  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);

  useEffect(() => {
    const setOK = typeof window !== undefined && currentUser && firebaseApp;

    if (setOK && isInitLoad) {
      setIsSubscribe(!!localStorage.getItem('methodCalledTime'));
      setIsInitLoad(false);
    } else if (setOK && processed) {
      setProcessed(false);
    } else if (setOK && !isSubscribe) {
      unsubscribe().then(success => {
        if (!success && !!localStorage.getItem('methodCalledTime')) {
          setIsSubscribe(true);
          setProcessed(true);
          errorToast("エラーが発生しました");
        }
      });
    } else if (setOK && isSubscribe) {
      const methodCalledTime = localStorage.getItem('methodCalledTime');
      const currentTime = new Date().getTime();
      const methodCallUid = localStorage.getItem('methodCallUid');

      let shouldSubscribe = !methodCalledTime || currentTime - parseInt(methodCalledTime) > 2592000000; // 2592000000ミリ秒 = 30日

      if (methodCallUid && currentUser?.uid !== methodCallUid) {
        shouldSubscribe = true;
        unsubscribe();
      }

      if (shouldSubscribe) {
        subscribe(currentUser?.uid || '').then(success => {
          if (!success) {
            setIsSubscribe(false);
            setProcessed(true);
            errorToast("エラーが発生しました", "ブラウザや端末の通知許可設定を確認してください。");
          }
        });
      }
    }
  }, [firebaseApp, currentUser, isSubscribe]);

  return [isSubscribe, setIsSubscribe];
};
