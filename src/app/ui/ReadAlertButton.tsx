'use client';

import {Button, useToast} from "@chakra-ui/react";
import {createAlreadyRead, getAlreadyReadById} from "../libs/microcms";
import ReactIcon from "./ReactIcon";
import {useEffect, useState} from "react";
import {useAuth} from "./AuthContext";

export default function ReadAlertButton({contactId}: {contactId: string}) {
  const toast = useToast();
  const [disabled, setDisabled] = useState(true);
  const {currentUser} = useAuth();

  const onClickFunction = async () => {
    if(!currentUser) {
      return false;
    }

    const body = {
      contactId: contactId,
      memberId: currentUser.uid,
      contactMember: `${contactId}\$\$${currentUser.uid}`,
      name: currentUser.name,
    };

    try {
      const result = await createAlreadyRead(body);
      toast({
        title: 'ありがとうございます。',
        description: "既読通知を送信しました。",
        status: 'success',
        position:'top',
        duration: 5000,
        isClosable: true,
      })
    } catch (e) {
      console.log(e);
    } finally {
      setDisabled(true);
    }
  };

  useEffect(() => {
    if(currentUser) {
      (async () => {
        const alreadyRead = await getAlreadyReadById(`${contactId}\$\$${currentUser.uid}`);
        if (alreadyRead?.contents?.length === 0) {
          setDisabled(false);
        }
      })()
    }
  }, [contactId, currentUser]);

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
