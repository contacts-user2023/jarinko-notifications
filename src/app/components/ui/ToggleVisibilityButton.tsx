'use client';

import {
  HStack,
  Text,
} from "@chakra-ui/react";
import {useToggleVisibility} from "@src/app/contexts/ToggleVisibilityContext";
import ReactIcon from "@src/app/components/ui/ReactIcon";

export default function ToggleVisibilityButton() {
  const {isVisible, toggle} = useToggleVisibility();

  return (
    <HStack
      onClick={toggle}
      _hover={{cursor: 'pointer'}}
      color={isVisible ? 'red.500' : 'gray.400'}
    >
      <Text fontSize="xs">状態変更ボタン{isVisible ? '表示中' : '非表示'}</Text>
      <ReactIcon iconName={isVisible ? 'PiToggleRightFill' : 'PiToggleLeft'} boxSize={10}/>
    </HStack>
  );
}
