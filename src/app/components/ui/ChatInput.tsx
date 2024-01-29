'use client';

import React, { useState, useCallback, ChangeEvent } from 'react';
import { Button, Textarea, HStack, Center } from '@chakra-ui/react';
import ReactIcon from "@src/app/components/ui/ReactIcon";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const handleTextareaChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      setIsDisable(true);
      try {
        onSendMessage(message);
        setMessage("");
      } catch(e) {
        console.log(e);
      } finally {
        setIsDisable(false);
      }
    }
  }, [message, onSendMessage]);

  return (
    <Center
      pt={2}
      pb="120px"
      position="fixed"
      zIndex="sticky"
      left={0}
      width="100%"
      bottom="0"
      bg="gray.50"
      borderTop="1px"
      borderColor="gray.200"
    >
      <HStack w="95%">
        <Textarea
          value={message}
          onChange={handleTextareaChange}
          bg="white"
          borderRadius="0.5rem"
          size="sm"
          resize="none"
        />
        <Button
          colorScheme="blue"
          onClick={handleSendMessage}
          isDisabled={isDisable}
        >
          <ReactIcon iconName="LuSend"/>
        </Button>
      </HStack>
    </Center>
  );
}
