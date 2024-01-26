import {getFirebaseConfig} from "../config/config";

importScripts('https://www.gstatic.com/firebasejs/10.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.1/firebase-messaging.js');

// Firebase の初期化
const firebaseConfig = getFirebaseConfig();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('メッセージが受信されました:', payload);

  // メッセージの内容に応じた処理をここに追加
});
