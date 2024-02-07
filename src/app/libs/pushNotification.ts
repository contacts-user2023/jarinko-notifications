import {getMessaging, getToken} from "firebase/messaging";
import {getFCMPublicKey} from "@/config/config";
import {subscribeToken, unsubscribeToken} from "@src/app/libs/messaging";

export const unsubscribe = async () => {
  let result: boolean;
  const methodCallUid = localStorage.getItem('methodCallUid');
  const methodCallToken = localStorage.getItem('methodCallToken') || '';

  if(methodCallUid && methodCallToken) {
    // ローカルストレージのデータがある場合は利用して購読データ削除
    result = await unsubscribeToken(methodCallUid, methodCallToken);
  } else {
    // 新しいトークンを発行して、現在のトークンを無効化する
    const messaging = getMessaging();
    try {
      result = !!(await getToken(messaging, {vapidKey: getFCMPublicKey()}));
    } catch(e) {
      result = false;
    }
  }
  localStorage.removeItem('methodCalledTime');
  localStorage.removeItem('methodCallUid');
  localStorage.removeItem('methodCallToken');

  return result;
};

export const subscribe = async (uid: string) => {
  const messaging = getMessaging();
  const token = await subscribeToken(messaging, uid);
  if (token) {
    const currentTime = new Date().getTime();
    localStorage.setItem('methodCalledTime', currentTime.toString());
    localStorage.setItem('methodCallUid', uid);
    localStorage.setItem('methodCallToken', token || '');

    return true;
  } else {
    return false;
  }
};
