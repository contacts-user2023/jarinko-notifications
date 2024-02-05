import {
  HStack,
  Center,
  StackDivider,
} from '@chakra-ui/react';
import NavItem from "./NavItem";
import {getUser} from "@src/app/libs/serverUser";
import {getPathName} from "@src/app/libs/serverPathName";

type Item = {
  name: string,
  href: string,
  target?: '_blank',
  iconName: string,
  isBadge: boolean,
  currentKey: string,
};
type Items = { [key: string]: Item };

const initItems = (isAdmin = false): Items => {
  let items: Items = {
    contacts: {
      name: '連絡帳',
      href: '/contacts',
      iconName: 'LuNewspaper',
      isBadge: false,
      currentKey: 'contacts',
    },
    chat: {
      name: 'チャット',
      href: '/chat',
      iconName: 'GoCommentDiscussion',
      isBadge: false,
      currentKey: 'chat',
    },
    settings: {
      name: 'その他',
      href: '/settings',
      iconName: 'PiDotsThreeBold',
      isBadge: false,
      currentKey: 'settings',
    },
  };

  if (isAdmin) {
    items = {
      posts: {
        name: '投稿',
        href: 'https://j-contacts.microcms.io/apis/contacts',
        target: '_blank',
        iconName: 'LuPenSquare',
        isBadge: false,
        currentKey: 'post',
      },
      users: {
        name: 'ユーザー',
        href: '/users',
        iconName: 'LuUser2',
        isBadge: false,
        currentKey: 'users',
      },
      ...items
    };
  }

  return items;
};

export default async function FootNav() {
  const currentUser = await getUser();
  const pathname = getPathName();
  if (pathname === '/') {
    return <></>
  }

  const items = initItems(currentUser?.isAdmin);

  return (
    <Center
      py={1}
      bg="gray.50"
      position="sticky"
      bottom={0}
      left={0}
      borderTop="1px"
      borderColor="gray.200"
      zIndex="sticky"
    >
      <HStack
        w="98%"
        divider={<StackDivider borderColor='gray.200'/>}
      >
        {Object.keys(items).map((e: string) => (<NavItem {...items[e]} key={e} />))}
      </HStack>
    </Center>
  )
}
