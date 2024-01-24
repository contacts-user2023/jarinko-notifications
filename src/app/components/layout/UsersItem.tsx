import {
  Card,
  Text,
  HStack,
  Badge,
  CardBody,
  CardFooter,
  Link,
  Divider,
  Spacer,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link'
import ReactIcon from "@src/app/components/ui/ReactIcon";
import UserActionButtonAvatar from "@src/app/components/ui/UserActionButtonAvatar";
import ChatAvatarButton from "@src/app/components/ui/ChatAvatarButton";
import {User} from "@src/app/types/IUser";

export default function UsersItem({displayName, photoURL, disabled, uid}: User) {
  const is_admin = photoURL === 'http://admin';

  return (
    <Card
      w="100%"
      bg="#fafafa"
      direction={{base: 'column'}}
    >
      <Link
        as={NextLink}
        href={`/users/${uid}`}
        w="100%"
        my={1}
        alignSelf="center"
        _hover={{
          textDecoration: 'none',
          opacity: '0.7'
        }}
      >
        <CardBody>
          <HStack justify="space-between">
            <HStack spacing={4} mb={1}>
              <VStack spacing={0}>
                <Badge
                  colorScheme={is_admin ? 'green' : 'yellow'}
                  minW="3rem"
                  style={{textAlign: 'center'}}
                >
                  {is_admin ? '管理者' : '一 般'}
                </Badge>
                {
                  disabled &&
                  <Badge
                    colorScheme='gray'
                    minW="3rem"
                    style={{textAlign: 'center'}}
                  >
                    無 効
                  </Badge>
                }
              </VStack>
              <Text>{displayName}</Text>
            </HStack>
            <ReactIcon iconName="LuChevronRight"/>
          </HStack>
        </CardBody>
      </Link>
      <Divider color="#ddd"/>
      <CardFooter py={3}>
        <HStack w="100%" spacing={4}>
          {
            !is_admin && !disabled &&
            <ChatAvatarButton uid={uid}/>
          }
          <Spacer/>
          {
            !disabled &&
            <UserActionButtonAvatar
              name={displayName}
              uid={uid}
              actionType="reset"
              iconName="MdLockReset"
              body={`メールアドレス宛に送信します。\nメール本文内のURLからパスワード再設定を行ってください。`}
              title="パスワード再設定メール送信"
            />
          }
          {
            !is_admin &&
            (
              disabled
                ? <>
                  <UserActionButtonAvatar
                    name={displayName}
                    uid={uid}
                    actionType="activate"
                    iconName="LuLightbulb"
                    body={`有効化したユーザーはログイン可能になります。\n有効化してもよろしいですか？`}
                    title="ユーザー有効化"
                  />
                  <UserActionButtonAvatar
                    name={displayName}
                    uid={uid}
                    actionType="delete"
                    iconName="LuTrash2"
                    body={`既読情報、チャット内容が見られなくなります。\n削除された情報は復元できません。\n削除してもよろしいですか？`}
                    title="ユーザー削除"
                  />
                </>
                : <UserActionButtonAvatar
                  name={displayName}
                  uid={uid}
                  actionType="deactivate"
                  iconName="LuLightbulbOff"
                  body={`無効化したユーザーはログインができなくなります。\n無効化してもよろしいですか？`}
                  title="ユーザーの無効化"
                />
            )
          }
        </HStack>
      </CardFooter>
    </Card>
  )
}
