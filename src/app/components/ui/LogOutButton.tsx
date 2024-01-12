'use client';

import {Button, useToast} from "@chakra-ui/react";
import ReactIcon from "./ReactIcon";
import {signOut} from "next-auth/react";
import {getAuth, signOut as firebaseSignOut} from "@src/app/libs/firebaseConfig";
import {useState} from "react";

export default function LogOutButton() {
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false);

  const onClickFunction = async () => {
    setIsDisabled(true);
    const auth = getAuth();
    await firebaseSignOut(auth);
    signOut()
      .then(() => {
        toast({
          title: 'ログアウトしました。',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true,
        })
      })
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
