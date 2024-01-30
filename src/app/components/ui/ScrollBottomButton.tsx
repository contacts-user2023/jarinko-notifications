'use client';

import {Box, Center, Text, VStack} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {RefObject} from "react";

type Props = {
  endOfMessagesRef: RefObject<HTMLDivElement>,
  showScrollButton: boolean,
  hasNew: boolean,
  scrollWindow: () => void,
};

export default function ScrollBottomButton({endOfMessagesRef, showScrollButton, hasNew, scrollWindow}: Props) {
  return (
    <>
      <Box ref={endOfMessagesRef}></Box>
      {
        showScrollButton &&
        <Center
          position="fixed"
          right="1rem"
          bottom={hasNew ? "225px" : "240px"}
          minW="2.7rem"
          py={2}
          borderRadius="0.5rem"
          bg={hasNew ? "red.300" : "blue.400"}
          color="white"
          as="span"
          onClick={scrollWindow}
        >
          <VStack spacing={0}>
            <ReactIcon boxSize={6} iconName="LuArrowDownToLine"/>
            {hasNew && <Text lineHeight={1}>new!</Text>}
          </VStack>
        </Center>
      }
    </>
  );
}
