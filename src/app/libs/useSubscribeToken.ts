'use client';

import {useEffect} from "react";
import {subscribeToken} from "@src/app/libs/messaging";
import {useSession} from "next-auth/react";

export const useSubscribeToken = () => {
  const {data: session} = useSession();
  const currentUser = session?.user;

  useEffect(() => {
    if (currentUser) {
      const methodCalledTime = localStorage.getItem('methodCalledTime');
      const currentTime = new Date().getTime();

      if (!methodCalledTime || currentTime - parseInt(methodCalledTime) > 2592000000) { // 2592000000ミリ秒 = 30日
        subscribeToken(currentUser?.uid).then(result => {
          if(result) {
            localStorage.setItem('methodCalledTime', currentTime.toString());
          }
        });
      }
    }
  }, [currentUser])
};
