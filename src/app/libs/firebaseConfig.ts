import {initializeApp, getApps, FirebaseApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  getRedirectResult,
} from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import {getFirebaseConfig} from "@/config/config";

export type User = {
  name: string
  is_admin?: boolean
  uid: string
}

// .envファイルで設定した環境変数をfirebaseConfigに入れる
const firebaseConfig = getFirebaseConfig();

let firebaseApp: FirebaseApp;
// サーバーサイドでレンダリングするときにエラーが起きないようにするための記述
if (typeof window !== undefined && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

const db = getFirestore();
const messaging = getMessaging();

export {
  firebaseApp,
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  getRedirectResult,
  db,
  messaging,
};
