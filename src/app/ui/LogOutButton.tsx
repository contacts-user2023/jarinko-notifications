'use client';

import {Button, useToast} from "@chakra-ui/react";
import ReactIcon from "./ReactIcon";
import {getAuth, signOut} from "../libs/firebaseConfig";
import {useState} from "react";

export default function LogOutButton() {
  const toast = useToast();
  const[isDisabled, setIsDisabled] = useState(false);

  const onClickFunction = async () => {
    const auth = getAuth();
    setIsDisabled(true);

    signOut(auth)
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
