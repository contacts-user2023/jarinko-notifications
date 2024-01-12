import {
  VStack,
} from '@chakra-ui/react';
import {User} from "@src/app/libs/firebaseConfig";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";
import UsersItem from "@src/app/components/layout/UsersItem";

export default async function Users() {
  const usersRef = adminDb.collection('users');
  const users = (await usersRef.get()).docs.map(v => v.data());

  return (
    <VStack>
      {users && (users as User[])?.map((user, i) => <UsersItem key={i} {...user} />)}
    </VStack>
  )
}
