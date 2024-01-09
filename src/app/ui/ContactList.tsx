'use client';

import {
  VStack,
} from '@chakra-ui/react';
import ContactInfo from "./ContactInfo";
import {Contact, listAlreadyReadByMemberId, listContacts} from "../libs/microcms";
import {toJSTString} from "../libs/dateFormatter";
import {useEffect, useState} from "react";
import SkeletonCard from "./SkeletonCard";
import {useAuth} from "./AuthContext";

type Result = {
  contents: Contact[]
};

export default function ContactList() {
  const [result, setResult] = useState<Result | null>(null);
  const [ids, setIds] = useState<string[] | null>(null);
  const {currentUser} = useAuth();

  useEffect(() => {
    if (currentUser) {
      listContacts().then((v: any) => setResult(v)).catch(() => setResult(null));
      listAlreadyReadByMemberId(currentUser?.uid).then((v: any) => setIds(v?.contents?.map((v: any) => v.contactId) || null));
    }
  }, [currentUser]);

  if (!result) {
    return <SkeletonCard length={10}/>
  }

  return (
    <VStack>
      {
        result?.contents && result.contents.map((contact: Contact, i) => (
          <ContactInfo
            key={i}
            alreadyRead={!ids ? true : ids.includes(contact.id as string)}
            contactId={contact.id}
            postedAt={toJSTString(contact.publishedAt)}
            title={contact.title}
          />
        ))
      }
    </VStack>
  )
}
