import {
  Button,
  ButtonGroup,
  VStack,
} from '@chakra-ui/react';
import {User} from "@src/app/libs/firebaseConfig";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";
import UsersItem from "@src/app/components/layout/UsersItem";
import ReactIcon from "@src/app/components/ui/ReactIcon";

export default async function Users() {
  const usersRef = adminDb.collection('users');
  const users = (await usersRef.get()).docs.map(v => v.data());

  return (
    <>
      <ButtonGroup w="100%" mb={4} spacing={4} justifyContent="right">
        <Button
          type="submit"
          variant="outline"
          colorScheme="green"
          as="a"
          href="/users/new"
          rightIcon={<ReactIcon iconName='LuPencil'/>}
        >新規作成</Button>
      </ButtonGroup>
      <VStack>
        {users && (users as User[])?.map((user, i) => <UsersItem key={i} {...user} />)}
      </VStack>
    </>
  )
}
