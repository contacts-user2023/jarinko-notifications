'use client';

import {useSession} from "next-auth/react";
import {db} from "@src/app/libs/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import {Badge, HStack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function UnreadBadge ({contactId}: {contactId: string | number}) {
  const {data} = useSession();
  const currentUser = data?.user;
  const [isRead, setIsRead] = useState(true);

  useEffect(() => {
    if(currentUser) {
      const unsubscribe = onSnapshot(doc(db, "user_receives", currentUser?.uid), (doc) => {
        if (doc?.data()) {
          // @ts-ignore
          setIsRead(doc.data().received.includes(contactId));
        } else {
          setIsRead(false);
        }
      });

      // コンポーネントがアンマウントされるときにunsubscribeを呼び出す
      return () => unsubscribe();
    }
  }, [currentUser, contactId]);

  return <Badge colorScheme='red' display={isRead ? 'none' : 'block'}>未読</Badge>
}
