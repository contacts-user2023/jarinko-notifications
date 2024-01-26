importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase の初期化
const firebaseConfig = {
  apiKey: 'AIzaSyANJY8HmS40TKWQCkgzmortthrBB_2dqlE',
  authDomain: 'jarinko-member-auth.firebaseapp.com',
  projectId: 'jarinko-member-auth',
  storageBucket: 'jarinko-member-auth.appspot.com',
  messagingSenderId: '713584462327',
  appId: '1:713584462327:web:a396df5b739d55cb42c6f2',
  measurementId: 'G-DGTNN8PNF3',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('メッセージが受信されました:', payload);

  // メッセージの内容に応じた処理をここに追加
});
