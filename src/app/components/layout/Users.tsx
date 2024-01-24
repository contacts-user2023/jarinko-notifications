import {
  Button,
  ButtonGroup,
  VStack,
} from '@chakra-ui/react';
import UsersItem from "@src/app/components/layout/UsersItem";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {getAuth} from "firebase-admin/auth";
import {User} from "@src/app/types/IUser";

export default async function Users() {
  const auth = getAuth();
  const users = (await auth.listUsers()).users;
  users.sort((a, b) => {
    if(a?.photoURL === 'http://admin') {
      return -1;
    }
    return 0;
  });

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
