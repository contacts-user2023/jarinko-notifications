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
  Avatar,
} from '@chakra-ui/react';
import NextLink from 'next/link'
import ReactIcon from "@src/app/components/ui/ReactIcon";
import UserActionButtonAvatar from "@src/app/components/ui/UserActionButtonAvatar";
import ChatAvatarButton from "@src/app/components/ui/ChatAvatarButton";

type Props = {
  name: string,
  is_admin?: boolean,
  uid: string,
};

export default function UsersItem({name, is_admin, uid}: Props) {
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
              <Badge
                colorScheme={is_admin ? 'green' : 'yellow'}
                minW="3rem"
                style={{textAlign: 'center'}}
              >
                {is_admin ? '管理者' : '一 般'}
              </Badge>
              <Text>{name}</Text>
            </HStack>
            <ReactIcon iconName="LuChevronRight"/>
          </HStack>
        </CardBody>
      </Link>
      <Divider color="#ddd"/>
      <CardFooter py={3}>
        <HStack w="100%" spacing={4}>
          {
            !is_admin &&
            <ChatAvatarButton uid={uid}/>
          }
          <Spacer />
          <UserActionButtonAvatar
            name={name}
            uid={uid}
            actionType="reset"
            iconName="MdLockReset"
            body={`メールアドレス宛に送信します。\nメール本文内のURLからパスワード再設定を行ってください。`}
            title="パスワード再設定メール送信"
          />
          {
            !is_admin &&
            <UserActionButtonAvatar
              name={name}
              uid={uid}
              actionType="delete"
              iconName="LuTrash2"
              body={`既読情報もあわせて削除されます。\n削除された情報は復元できません。\n削除してもよろしいですか？`}
              title="ユーザー削除"
            />
          }
        </HStack>
      </CardFooter>
    </Card>
  )
}
