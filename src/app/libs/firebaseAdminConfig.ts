const {initializeApp, cert, getApp, getApps} = require('firebase-admin/app');
import { getFirestore } from "firebase-admin/firestore";
import {getFirebaseAdminConfig} from "@/config/config";
const serviceAccount = getFirebaseAdminConfig();

export const initAdminApp = () => {
  return getApps().length === 0 ? initializeApp({
    credential: cert(serviceAccount)
  }) : getApp();
};
const firebaseAdmin = initAdminApp();

export const adminDb = getFirestore(firebaseAdmin);
