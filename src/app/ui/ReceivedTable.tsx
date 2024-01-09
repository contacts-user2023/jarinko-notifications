'use client';

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {toJSTString} from "../libs/dateFormatter";
import {useAuth} from "./AuthContext";
import {AlreadyRead, ContentsAlreadyRead, listAlreadyReadByContentId} from "../libs/microcms";
import {useEffect, useState} from "react";

type Props = {
  id: string,
};

export default function ReceivedTable({id}: Props) {
  const {currentUser} = useAuth();
  const [data, setData] = useState<AlreadyRead[] | null>(null);

  useEffect(() => {
    if (currentUser?.is_admin) {
      (async () => {
        const alreadyRead = await listAlreadyReadByContentId(id).catch(() => null);
        if (alreadyRead) {
          setData(alreadyRead);
        }
      })();
    }
  }, [currentUser, id]);

  return <Accordion mt={4} allowToggle>
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex='1' textAlign='left'>
            読んだ人 {data?.length || 0}名
          </Box>
          <AccordionIcon/>
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
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
                data && data.map((v, i) => (
                  <Tr key={i}>
                    <Td>{v.name}</Td>
                    <Td>{toJSTString(v.createdAt)}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </TableContainer>
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
}
