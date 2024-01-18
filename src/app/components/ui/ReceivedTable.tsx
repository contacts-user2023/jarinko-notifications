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
import {toJSTString} from "@src/app/libs/dateFormatter";
import {getUser} from "@src/app/libs/serverUser";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";

type Props = {
  id: string,
};

export default async function ReceivedTable({id}: Props) {
  const user = await getUser();
  if(!user || !user?.isAdmin) {
    return <></>;
  }
  const docRef = adminDb.collection('receives').doc(id);
  const snap = await docRef.get();
  const alreadyReads = snap?.data()?.received || [];

  const usersRef = adminDb.collection('users');
  const users = (await usersRef.get()).docs.map(v => v.data());

  const activeUserWithReceived = users.map((user: {[key: string]: string}) => {
    let result: {name: string, receivedAt: null | string} = {name: user.name, receivedAt: null};
    const alreadyRead = alreadyReads.find((v: {[key: string]: any}) => user.uid === v.uid);
    if(alreadyRead) {
      result.receivedAt = toJSTString(alreadyRead.timestamp.toMillis());
    }
    return result;
  });

  const receivedCount = activeUserWithReceived.filter(item => !!item.receivedAt).length;

  return (user.isAdmin &&
    <Accordion mt={4} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              読んだ人 {receivedCount || 0}名 / {users?.length || 0} 名中
            </Box>
            <AccordionIcon/>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={2}>
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
                  activeUserWithReceived.map((v, i) => (
                    <Tr key={i}>
                      <Td style={i === activeUserWithReceived.length - 1 ? {borderBottom: 'none'} : {}}>{v.name}</Td>
                      <Td style={i === activeUserWithReceived.length - 1 ? {borderBottom: 'none'} : {}}>{v.receivedAt}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
            </Table>
          </TableContainer>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
