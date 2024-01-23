'use client';

import {Avatar, AvatarBadge} from "@chakra-ui/react";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {useEffect, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "@src/app/libs/firebaseConfig";

type Props = {
  uid: string,
};

export default function ChatAvatarButton({uid}: Props) {
  const [isBadge, setIsBadge] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribe = onSnapshot(doc(db, "chat_activities", uid), (doc) => {
          const data = doc?.data();
          setIsBadge(data?.guest);
        });

        return () => unsubscribe();
      }
    })
  }, []);

  return (
    <Avatar
      variant="outline"
      as="a"
      href={`/chat/${uid}`}
      bg="inherit"
      color="green.400"
      size="sm"
      icon={<ReactIcon iconName="BsChatDots" boxSize={6}/>}
    >
      {
        isBadge
          ? <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em'/>
          : <></>
      }
    </Avatar>
  );
}
