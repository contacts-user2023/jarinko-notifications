'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'

import {
  HStack,
  Center,
  StackDivider,
} from '@chakra-ui/react';
import NavItem from "./NavItem";
import {useAuth} from "./AuthContext";
import {listAlreadyReadByMemberId, listContacts} from "../libs/microcms";

type Item = {
  name: string,
  href: string,
  target?: 'blank',
  iconName: string,
  isBadge: boolean,
  current: boolean,
};
type Items = { [key: string]: Item };

const initItems = (path: string, hasUnread: boolean, isAdmin = false): Items => {
  let items: Items = {
    post: {
      name: '投稿',
      href: 'https://j-contacts.microcms.io/apis/contacts',
      target: 'blank',
      iconName: 'LuPenSquare',
      isBadge: false,
      current: false,
    },
    users: {
      name: 'ユーザー管理',
      href: '/users',
      iconName: 'LuUser2',
      isBadge: false,
      current: false,
    },
    contacts: {
      name: '連絡帳',
      href: '/contacts',
      iconName: 'LuNewspaper',
      isBadge: false,
      current: false,
    },
    // notifications: {
    //   name: 'お知らせ',
    //   href: '/notifications',
    //   iconName: 'LuBell',
    //   isBadge: false,
    //   current: false,
    // },
    settings: {
      name: '設定',
      href: '/settings',
      iconName: 'LuSettings',
      isBadge: false,
      current: false,
    },
  };

  if(path && !items[path]?.current) {
    items[path].current = true;
  }
  if(hasUnread) {
    items.contacts.isBadge = true;
  }
  if(!isAdmin) {
    delete items.post;
    delete items.users;
  }

  return items;
};

export default function FootNav() {
  const pathname = usePathname();
  const basePath = pathname.split('/')[1];
  const {currentUser} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState(initItems(basePath, false));

  useEffect(() => {
    if(currentUser) {
      (async () => {
        const alreadyLength = (await listAlreadyReadByMemberId(currentUser.uid))?.contents?.length || 0;
        const contactLength = (await listContacts())?.contents?.length || 0;
        setItems(initItems(basePath, contactLength > alreadyLength, currentUser.is_admin));
        setIsLoading(false);
      })();
    }
  }, [pathname, basePath, currentUser]);

  if(pathname === '/') {
    return <></>
  }

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
        {
          !isLoading && Object.keys(items).map((e: string) => (
            <NavItem
              key={e}
              name={items[e].name}
              href={items[e].href}
              target={items[e]?.target || ''}
              iconName={items[e].iconName}
              isBadge={items[e].isBadge}
              current={items[e].current}
            />
          ))
        }
      </HStack>
    </Center>
  )
}
