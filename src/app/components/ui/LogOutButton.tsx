'use client';

import {Button} from "@chakra-ui/react";
import ReactIcon from "./ReactIcon";
import {signOut} from "next-auth/react";
import {getAuth, signOut as firebaseSignOut} from "@src/app/libs/firebaseConfig";
import {useState} from "react";
import {useSuccessToast} from "@src/app/hooks/useCustomToast";
import {unsubscribe} from "@src/app/libs/pushNotification";

export default function LogOutButton() {
  const successToast = useSuccessToast();
  const [isDisabled, setIsDisabled] = useState(false);

  const onClickFunction = async () => {
    setIsDisabled(true);
    try {
      unsubscribe();
    } catch(e) {
      console.log('Failed clear token');
    }
    const auth = getAuth();
    await firebaseSignOut(auth);
    signOut()
      .then(() => successToast('ログアウトしました。'))
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
      });
  };

  return <Button
    colorScheme="gray"
    variant='outline'
    rightIcon={<ReactIcon iconName='IoMdLogOut'/>}
    onClick={onClickFunction}
    isDisabled={isDisabled}
  >
    ログアウト
  </Button>
}
