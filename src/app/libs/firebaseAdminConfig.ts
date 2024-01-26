const {initializeApp, cert, getApp, getApps} = require('firebase-admin/app');
import { getFirestore } from "firebase-admin/firestore";
import {getMessaging} from "firebase-admin/messaging";
import { GoogleAuth } from 'google-auth-library';
import {getFirebaseAdminConfig} from "@/config/config";
const serviceAccount = getFirebaseAdminConfig();

export const initAdminApp = () => {
  return getApps().length === 0 ? initializeApp({
    credential: cert(serviceAccount)
  }) : getApp();
};
const firebaseAdmin = initAdminApp();

export const adminDb = getFirestore(firebaseAdmin);
export const adminMessaging = getMessaging(firebaseAdmin);

export const getAccessToken = async() => {
  const auth = new GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  });

  return await auth.getAccessToken();
};
