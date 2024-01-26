import {
  VStack,
} from '@chakra-ui/react';
import {Contact, listContacts} from "@src/app/libs/microcms";
import {toJSTString} from "@src/app/libs/dateFormatter";
import {ReactNode} from "react";
import {getUser} from "@src/app/libs/serverUser";
import {redirect} from 'next/navigation'
import ContactsItem from "@src/app/components/layout/ContactsItem";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";
import FCMSubscribe from "@src/app/components/ui/FCMSubscribe";

type Props = {
  children?: ReactNode
};
type Receives = string[];

export default async function Contacts({children}: Props) {
  const user = await getUser();
  if (!user) {
    redirect('/')
  }

  const contacts = await listContacts();
  const docRef = adminDb.collection('receives');
  const snap = await docRef.get();
  let receives: Receives = [];
  snap.forEach(doc => {
    const data = doc.data();
    if (data?.received && data.received.some((v: { [key: string]: string }) => v.uid === user.uid)) {
      receives.push(doc.id);
    }
  });

  return (
    <>
      <VStack>
        {
          contacts?.contents && contacts.contents.map((contact: Contact, i) => (
            <ContactsItem
              key={i}
              alreadyRead={receives.includes(contact.id as string)}
              contactId={contact.id}
              postedAt={toJSTString(contact.publishedAt)}
              title={contact.title}
            />
          ))
        }
      </VStack>
      {/*<FCMSubscribe />*/}
    </>
  )
}
