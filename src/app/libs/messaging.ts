'use client';

import {getToken, Messaging} from "firebase/messaging";
import {getFCMPublicKey} from "@/config/config";

export const subscribeToken = async (messaging: Messaging, uid: string) => {
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
