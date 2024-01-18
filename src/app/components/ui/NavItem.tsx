'use client';

import {
  Card,
  Text,
  VStack,
  Avatar,
  AvatarBadge,
  Link,
} from '@chakra-ui/react';
import {useSession} from "next-auth/react";
import NextLink from 'next/link'
import ReactIcon from "./ReactIcon";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {Contact, listContacts} from "@src/app/libs/microcms";
import {doc, DocumentData, onSnapshot} from "firebase/firestore";
import {db} from "@src/app/libs/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";

type Props = {
  name: string,
  iconName: string,
  href: string,
  target?: string,
  currentKey: string
};
export default function NavItem(
  {
    name,
    iconName,
    href,
    target,
    currentKey,
  }: Props) {

  const {data} = useSession();
  const currentUser = data?.user;
  const pathname = usePathname();
  const [isBadge, setIsBadge] = useState(false);
  const [current, setCurrent] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    if (currentKey === 'contacts' && currentUser) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const unsubscribe = onSnapshot(doc(db, "user_receives", currentUser?.uid), (doc) => {
            (async () => {
              const contacts = (await listContacts())?.contents || [];
              if (doc?.data()) {
                const contactIds = contacts.map((v: Contact) => v.id);
                // @ts-ignore
                const received = doc.data().received.filter((v: string) => contactIds.includes(v));
                setIsBadge(contactIds.length > received.length);
              } else if (contacts.length > 0) {
                setIsBadge(true);
              } else {
                setIsBadge(false);
              }
            })();
          });

          return () => unsubscribe();
        }
      })
    }
    setCurrent(currentKey === pathname.split('/')[1]);
  }, [pathname, currentKey, currentUser]);

  return (currentUser && pathname !== '/' &&
    <Link
      as={NextLink}
      href={href}
      target={target}
      w="100%"
      _hover={{opacity: 0.7}}
    >
      <Card
        bg={current ? 'orange.100' : 'gray.100'}
        align="center"
        py={2}
        flex={1}
      >
        <VStack spacing={1}>
          <Avatar bg="white" color="black" icon={<ReactIcon iconName={iconName} boxSize={10}/>}>
            {
              isBadge
                ? <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em'/>
                : <></>
            }
          </Avatar>
          <Text fontSize="xs">{name}</Text>
        </VStack>
      </Card>
    </Link>
  )
}
