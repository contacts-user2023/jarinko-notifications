import {
  Container,
  VStack,
} from '@chakra-ui/react';
import {Contact, listAlreadyReadByMemberId, listContacts} from "../../libs/microcms";
import {toJSTString} from "../../libs/dateFormatter";
import {ReactNode, Suspense} from "react";
import {getUser} from "@src/app/libs/serverUser";
import {redirect} from 'next/navigation'
import ContactsItem from "@src/app/components/layout/ContactsItem";
import SkeletonCard from "@src/app/components/ui/SkeletonCard";

type Props = {
  children?: ReactNode
};

export default async function Contacts({children}: Props) {
  const user = await getUser();
  if (!user) {
    redirect('/')
  }

  const contacts = await listContacts();
  const alreadyReads = (await listAlreadyReadByMemberId(user.uid))?.contents?.map((v: any) => v.contactId) || null;

  return (
    <VStack>
      <Suspense fallback={<SkeletonCard length={10}/>}>
        {
          contacts?.contents && contacts.contents.map((contact: Contact, i) => (
            <ContactsItem
              key={i}
              alreadyRead={!alreadyReads ? true : alreadyReads.includes(contact.id as string)}
              contactId={contact.id}
              postedAt={toJSTString(contact.publishedAt)}
              title={contact.title}
            />
          ))
        }
      </Suspense>
    </VStack>
  )
}
