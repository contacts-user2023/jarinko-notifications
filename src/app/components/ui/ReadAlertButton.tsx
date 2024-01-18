'use client';

import {Button} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useEffect, useState} from "react";
import {db} from "@src/app/libs/firebaseConfig";
import {doc, Timestamp, arrayUnion, setDoc, onSnapshot} from "firebase/firestore";
import {useSession} from "next-auth/react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {useErrorToast, useSuccessToast} from "@src/app/libs/useCustomToast";

type Props = {
  contactId: string,
  memberId: string,
  name: string,
};

export default function ReadAlertButton({contactId, name}: Props) {
  const {data} = useSession();
  const currentUser = data?.user;
  const successToast = useSuccessToast();
  const errorToast = useErrorToast();
  const [disabled, setDisabled] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    if (currentUser) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const unsubscribe = onSnapshot(doc(db, "user_receives", currentUser?.uid), (doc) => {
            if (doc?.data()) {
              // @ts-ignore
              setDisabled(doc.data().received.includes(contactId));
            } else {
              setDisabled(false);
            }
          });

          return () => unsubscribe();
        }
      })
    }
  }, [currentUser, contactId]);

  const onClickFunction = async () => {
    setDisabled(true);

    const receivesRef = doc(db, "receives", contactId);
    const userReceivesRef = doc(db, "user_receives", currentUser?.uid as string);
    const data = {
      uid: currentUser?.uid,
      timestamp: Timestamp.now()
    };
    try {
      await setDoc(receivesRef, {received: arrayUnion(data)}, {merge: true});
      await setDoc(userReceivesRef, {received: arrayUnion(contactId)}, {merge: true});
      successToast('ありがとうございます。', "既読通知を送信しました。");
    } catch (e) {
      console.log(e);
      errorToast('エラーが発生しました。', "ページを読み込み直してください。");
    }
  };

  return <Button
    colorScheme="yellow"
    variant='outline'
    rightIcon={<ReactIcon iconName='LuThumbsUp'/>}
    onClick={onClickFunction}
    isDisabled={disabled}
  >
    読みました
  </Button>
}
