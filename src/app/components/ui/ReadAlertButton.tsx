'use client';

import {Button, useToast} from "@chakra-ui/react";
import {createAlreadyRead, getAlreadyReadById} from "@src/app/libs/microcms";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useEffect, useState} from "react";

type Props = {
  contactId: string,
  memberId: string,
  name: string
};

export default function ReadAlertButton({contactId, memberId, name}: Props) {
  const toast = useToast();
  const [disabled, setDisabled] = useState(true);
  const onClickFunction = async () => {
    const body = {
      contactId: contactId,
      memberId: memberId,
      contactMember: `${contactId}\$\$${memberId}`,
      name: name,
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
      (async () => {
        const alreadyRead = await getAlreadyReadById(`${contactId}\$\$${memberId}`);
        if (alreadyRead?.contents?.length === 0) {
          setDisabled(false);
        }
      })()
  }, [contactId, memberId]);

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
