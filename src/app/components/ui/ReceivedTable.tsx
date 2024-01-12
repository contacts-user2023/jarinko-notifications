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
import {listAlreadyReadByContentId} from "@src/app/libs/microcms";
import {getUser} from "@src/app/libs/serverUser";

type Props = {
  id: string,
};

export default async function ReceivedTable({id}: Props) {
  const user = await getUser();
  if(!user || !user?.isAdmin) {
    return <></>;
  }

  const alreadyReads = await listAlreadyReadByContentId(id).catch(() => null);

  return (user.isAdmin &&
    <Accordion mt={4} allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex='1' textAlign='left'>
              読んだ人 {alreadyReads?.length || 0}名
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
                  alreadyReads && alreadyReads.map((v, i) => (
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
  )
}
