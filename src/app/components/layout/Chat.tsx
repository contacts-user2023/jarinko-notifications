'use client';

import {Box, HStack, VStack, Center, Text, Spacer, Link} from '@chakra-ui/react';
import {Fragment} from "react";
import {Timestamp} from "firebase/firestore";
import {toJSTDateString, toJSTTimeString} from "@src/app/libs/dateFormatter";
import DateDivider from "@src/app/components/ui/DateDivider";
import OutgoingMessage from "@src/app/components/ui/OutgoingMessage";
import IncomingMessage from "@src/app/components/ui/IncomingMessage";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {decryptMessage} from "@src/app/libs/encryption";
import NextLink from "next/link";
import ChatInput from "@src/app/components/ui/ChatInput";
import useChatMessages from "@src/app/hooks/useChatMessages";
import {useSession} from "next-auth/react";

type Props = {
  toUid?: string,
  partnerName: string,
};

type Chat = {
  uid: string,
  timestamp: Timestamp,
  message: string,
  received?: boolean,
};

export default function Chat({toUid, partnerName}: Props) {
  const {data: session} = useSession();
  const currentUser = session?.user;

  const {
    chats,
    addMessage,
    hasNew,
    showScrollButton,
    scrollWindow,
    endOfMessagesRef,
    chatWindowRef
  } = useChatMessages({toUid});

  const needDivider = (currentMs: number, prevMs: number | null) => {
    if (prevMs === null) {
      return true;
    }

    const currentDate = toJSTDateString(currentMs);
    const prevDate = toJSTDateString(prevMs);

    return currentDate !== prevDate;
  };

  return (
    <Box ref={chatWindowRef}>
      <HStack
        pt="75px"
        pb={2}
        px={4}
        position="fixed"
        zIndex="dropdown"
        left={0}
        width="100%"
        top="0"
        bg="gray.50"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Link
          as={NextLink}
          href={currentUser?.isAdmin ? "/users" : "/contacts"}
          _hover={{
            textDecoration: 'none',
            opacity: '0.7'
          }}
        >
          <ReactIcon iconName="LuChevronLeft"/>
        </Link>
        <Text>{partnerName}</Text>
        <Spacer/>
      </HStack>
      {
        chats && chats.map((tips: Chat, i: number) => {
          const ms = tips.timestamp.seconds * 1000;
          const time = toJSTTimeString(ms);

          return (
            <Fragment key={i}>
              {
                // 現在と前のタイムスタンプを使用してneedDividerを呼び出す
                i === 0 || needDivider(ms, chats[i - 1].timestamp.seconds * 1000) ? <DateDivider ms={ms}/> : null
              }
              <Box>
                {
                  currentUser?.uid === tips.uid
                    ? <OutgoingMessage time={time} message={decryptMessage(tips.message)} received={!!tips?.received}/>
                    : <IncomingMessage time={time} message={decryptMessage(tips.message)}/>
                }
              </Box>
            </Fragment>
          )
        })
      }
      <Box ref={endOfMessagesRef}></Box>
      <form>
        <ChatInput onSendMessage={addMessage}/>
      </form>
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
    </Box>
  );
}
