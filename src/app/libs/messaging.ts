'use client';

import {getToken} from "firebase/messaging";
import {getFCMPublicKey} from "@/config/config";
import {messaging} from "@src/app/libs/firebaseConfig";

export const subscribeToken = async (uid: string) => {
  try {
    const token = await getToken(messaging, {vapidKey: getFCMPublicKey()});
    const api = await fetch('/api/fcm_subscribed_tokens', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"uid": uid, "token": token})
    });
    if(!api.ok) {
      console.log(await api.json());
    } else {
      console.log('Set token ok!');
    }

    return api.ok;
  } catch(e) {
    console.log(e);
    return false;
  }
};
