'use client';

import {
  HStack,
  Text,
} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useSubscribeToken} from "@src/app/hooks/useSubscribeToken";

export default function PushSubscriptionButton() {
  const [isSubscribe, setIsSubscribe] = useSubscribeToken();

  const onClickHandler = () => {
    setIsSubscribe((prevState: boolean) => !prevState);
  };

  return (
    <HStack
      onClick={onClickHandler}
      _hover={{cursor: 'pointer'}}
      sx={{svg: {color: isSubscribe ? 'green.400' : 'gray.400'}}}
    >
      <ReactIcon iconName={isSubscribe ? 'PiToggleRightFill' : 'PiToggleLeft'} boxSize={10}/>
      <Text>プッシュ通知を{isSubscribe ? '許可中' : '拒否中'}</Text>
    </HStack>
  );
}
