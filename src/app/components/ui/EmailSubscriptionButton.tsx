'use client';

import {
  HStack,
  Text,
} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useState} from "react";

export default function EmailSubscriptionButton() {
  const [isSubscribe, setIsSubscribe] = useState(false);

  const onClickHandler = () => {
    setIsSubscribe(!isSubscribe);
  };

  return (
    <HStack
      onClick={onClickHandler}
      _hover={{cursor: 'pointer'}}
      sx={{svg: {color: isSubscribe ? 'green.400' : 'gray.400'}}}
    >
      <ReactIcon iconName={isSubscribe ? 'PiToggleRightFill' : 'PiToggleLeft'} boxSize={10}/>
      <Text>Eメール通知を{isSubscribe ? '許可中' : '拒否中'}</Text>
    </HStack>
  );
}
