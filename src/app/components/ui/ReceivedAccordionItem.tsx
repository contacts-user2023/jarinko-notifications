'use client'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Text,
  Spacer,
} from '@chakra-ui/react';
import {toJSTString} from "@src/app/libs/dateFormatter";
import {useEffect, useState} from "react";
import ReactIcon from "@src/app/components/ui/ReactIcon";

type User = {displayName?: string, uid: string, disabled: boolean};
type AlreadyRead = {uid: string, timestamp: number};
type UserWithReceived = {
  name?: string,
  receivedAt: null | string,
  disabled: boolean
};
type Props = {
  alreadyReads: AlreadyRead[],
  users: User[],
};

export default function ReceivedAccordionItem({alreadyReads, users}: Props) {
  const [showDisableUser, setShowDisableUser] = useState(false);
  const [receivedCount, setReceivedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [receives, setReceives] = useState<(UserWithReceived | undefined)[] | []>([]);

  const setUserWithReceived = (): (UserWithReceived | undefined)[] => {
    return users.map((user: User) => {
      if(!showDisableUser && user.disabled) {
        return;
      }
      let result: UserWithReceived = {
        name: user?.displayName,
        receivedAt: null,
        disabled: user.disabled
      };
      const alreadyRead = alreadyReads.find((v: { [key: string]: any }) => user.uid === v.uid);
      if (alreadyRead) {
        result.receivedAt = toJSTString(alreadyRead.timestamp);
      }
      return result;
    })
      .filter((item: any) => item)
      .sort((a, b) => {
        if(!b?.disabled) {
          return 1;
        }
        return -1;
      });
  };

  useEffect(() => {
    if(showDisableUser) {
      setTotalCount(users.length);
    } else {
      setTotalCount(users.filter((user: User) => !user.disabled).length);
    }
    setReceives(setUserWithReceived());
  }, [showDisableUser]);

  useEffect(() => {
    setReceivedCount(receives.filter(item => !!item?.receivedAt).length);
  }, [receives]);

  const toggleShowDisableUser = () => {
    setShowDisableUser(!showDisableUser);
  };

   return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' textAlign='left'>
            読んだ人 {receivedCount || 0}名 / {totalCount} 名中
          </Box>
          <AccordionIcon/>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={2}>
        <HStack
          onClick={toggleShowDisableUser}
          _hover={{cursor: 'pointer'}}
          color={showDisableUser ? 'green.400' : 'gray.400'}
        >
          <Spacer/>
          <Text fontSize="xs">無効ユーザー{showDisableUser ? '表示中' : '非表示'}</Text>
          <ReactIcon iconName={showDisableUser ? 'PiToggleRightFill' : 'PiToggleLeft'} boxSize={10}/>
        </HStack>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>ユーザー名</Th>
                <Th>既読送信日</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                receives.map((v, i) => (
                  <Tr key={i} color={v?.disabled ? 'gray.400' : 'inherit'}>
                    <Td style={i === receives.length - 1 ? {borderBottom: 'none'} : {}}>{v?.name}</Td>
                    <Td
                      style={i === receives.length - 1 ? {borderBottom: 'none'} : {}}>{v?.receivedAt}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  )
}
