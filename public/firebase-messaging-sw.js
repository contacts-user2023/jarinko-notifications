importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

import {messaging} from '../src/app/libs/firebaseConfig';

messaging.onBackgroundMessage((payload) => {
  console.log('メッセージが受信されました:', payload);

  // メッセージの内容に応じた処理をここに追加
});
