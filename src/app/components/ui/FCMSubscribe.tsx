'use client';

import {useSubscribeToken} from "@src/app/libs/useSubscribeToken";

export default function FCMSubscribe() {
  // console.log(Notification.permission);
  if (Notification.permission === "granted") {
    // 通知を送信
  } else if (Notification.permission === "default") {
    // ユーザーに許可を求める
    Notification.requestPermission();
  } else if (Notification.permission === "denied") {
    // 通知設定がブロックされている場合のメッセージを表示
    alert("通知がブロックされています。ブラウザの設定で通知を許可してください。");
  }
  useSubscribeToken();

  return <></>;
}
