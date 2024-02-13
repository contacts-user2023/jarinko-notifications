'use client';

import {
  HStack,
  Button,
  Spacer,
  Text,
} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useSubscribeToken} from "@src/app/hooks/useSubscribeToken";
import {useEffect, useState} from "react";

export default function PushSubscriptionButton() {
  const [isSubscribe, setIsSubscribe] = useSubscribeToken();
  const [isOkTest, setIsOkTest] = useState<boolean>(false);

  useEffect(() => {
    setIsOkTest(localStorage.getItem('isOkTest') === 'true');
  }, []);

  const onClickHandler = () => {
    setIsSubscribe((prevState: boolean) => !prevState);
  };

  const testPush = async () => {
    const methodCallToken = localStorage.getItem('methodCallToken') || '';

    if (methodCallToken) {
      const api = await fetch('/api/push/test', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"token": methodCallToken})
      });
      if (api?.ok) {
        localStorage.setItem('isOkTest', 'true');
        setIsOkTest(true);
      }
    }
  };

  return (
    <HStack w="100%">
      <HStack
        onClick={onClickHandler}
        _hover={{cursor: 'pointer'}}
        sx={{svg: {color: isSubscribe ? 'green.400' : 'gray.400'}}}
      >
        <ReactIcon iconName={isSubscribe ? 'PiToggleRightFill' : 'PiToggleLeft'} boxSize={10}/>
        <Text>プッシュ通知を{isSubscribe ? '許可中' : '拒否中'}</Text>
      </HStack>
      <Spacer/>
      {
        !isOkTest &&
        <Button
          onClick={testPush}
          colorScheme="blue"
          size="sm"
          isDisabled={!isSubscribe}
        >
          通知テスト
        </Button>
      }
    </HStack>
  );
}
