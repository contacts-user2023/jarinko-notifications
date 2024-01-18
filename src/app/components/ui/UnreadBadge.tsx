'use client';

import {useSession} from "next-auth/react";
import {db} from "@src/app/libs/firebaseConfig";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, onSnapshot} from "firebase/firestore";
import {Badge} from "@chakra-ui/react";
import {useEffect, useState} from "react";

export default function UnreadBadge({contactId}: { contactId: string | number }) {
  const {data} = useSession();
  const currentUser = data?.user;
  const [isRead, setIsRead] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    if (currentUser) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const unsubscribe = onSnapshot(doc(db, "user_receives", currentUser?.uid), (doc) => {
            if (doc?.data()) {
              // @ts-ignore
              setIsRead(doc.data().received.includes(contactId));
            } else {
              setIsRead(false);
            }
          });

          return () => unsubscribe();
        }
      })
    }
  }, [currentUser, contactId]);

  return <Badge colorScheme='red' display={isRead ? 'none' : 'block'}>未読</Badge>
}
