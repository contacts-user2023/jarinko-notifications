import {
  Button,
  ButtonGroup,
  VStack,
  Tabs, TabList, TabPanels, Tab, TabPanel
} from '@chakra-ui/react';
import UsersItem from "@src/app/components/layout/UsersItem";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {getAuth} from "firebase-admin/auth";
import {User} from "@src/app/types/IUser";
import ResponsiveText from "@src/app/components/ui/ResponsiveText";

export default async function Users() {
  const auth = getAuth();
  const users = (await auth.listUsers()).users;
  users.sort((a, b) => {
    if (a?.photoURL === 'http://admin') {
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
      <Tabs variant='enclosed' defaultIndex={1}>
        <TabList>
          <Tab>すべて</Tab>
          <Tab><ResponsiveText text="有効" responsiveText="なユーザー" boundary="sm"/></Tab>
          <Tab><ResponsiveText text="無効" responsiveText="なユーザー" boundary="sm"/></Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack>
              {users && (users as User[])?.map((user, i) => <UsersItem key={i} {...user} />)}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {users && (users as User[])?.map((user, i) => {
                if (!user.disabled) {
                  return <UsersItem key={i} {...user} />
                }
              })}
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              {users && (users as User[])?.map((user, i) => {
                if (user.disabled) {
                  return <UsersItem key={i} {...user} />
                }
              })}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
