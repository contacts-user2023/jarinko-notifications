'use client';

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
} from '@chakra-ui/react';
import BackButton from "../../ui/BackButton";
import {doc, getDoc} from "@firebase/firestore";
import {db, User} from "../../libs/firebaseConfig";
import {useEffect, useState} from "react";
import {useAuth} from "../../ui/AuthContext";
import {useRouter} from "next/navigation";

type Props = {
  params: {
    id: string
  }
};

export default function Page({params}: Props) {
  const {currentUser} = useAuth();
  const router = useRouter();
  if(!currentUser?.is_admin) {
    router.replace('/not-found');
  }

  const [user, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    const ref = doc(db, 'users', params.id);
    getDoc(ref).then(doc => setUser(doc.data() as User));
  }, [params.id]);

  if (!user || !currentUser?.is_admin) {
    return (
      <Card bg="#fafafa">
        <CardFooter justify="right">
          <ButtonGroup spacing={4}>
            <BackButton href="/users"/>
          </ButtonGroup>
        </CardFooter>
      </Card>
    )
  }

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
                  <Td>権限</Td>
                  <Td>{user?.is_admin ? '管理者' : '一般'}</Td>
                </Tr>
                <Tr>
                  <Td>UID</Td>
                  <Td>{user?.uid}</Td>
                </Tr>
                <Tr>
                  <Td>ユーザー名</Td>
                  <Td>{user?.name}</Td>
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
}
