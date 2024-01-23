import {
  Card,
  CardBody,
  CardFooter,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import BackButton from "@src/app/components/ui/BackButton";
import {getAuth} from "firebase-admin/auth";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";

type Props = { id: string };

export default async function User({id}: Props) {
  try {
    const auth = await getAuth();
    const decoded = await auth.getUser(id);

    const docRef = adminDb.collection('users').doc(decoded?.uid);
    const snap = await docRef.get();
    const user = snap.data();

    return (
      <>
        <Card bg="#fafafa">
          <CardBody>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th> </Th>
                    <Th> </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Text fontSize="xs">ユーザー名</Text>
                      <Text>{user?.name}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontSize="xs">メールアドレス</Text>
                      <Text>{decoded?.email}</Text>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <Text fontSize="xs">権限</Text>
                      <Text>{user?.is_admin ? '管理者' : '一般'}</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
          <CardFooter justify="right">
            <ButtonGroup spacing={4}>
              <BackButton href="/users"/>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </>
    )
  } catch (e) {
    console.log(e);

    return (
      <>
        <Card bg="#fafafa">
          <CardBody>
          </CardBody>
          <CardFooter justify="right">
            <ButtonGroup spacing={4}>
              <BackButton href="/users"/>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </>
    )
  }
}
