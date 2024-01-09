'use client';

import {
  VStack,
} from '@chakra-ui/react';
import UserInfo from "./UserInfo";
import {useEffect, useState} from "react";
import SkeletonCard from "./SkeletonCard";
import {getDocs} from "@firebase/firestore";
import {db, User} from "../libs/firebaseConfig";
import {collection} from 'firebase/firestore';
import {useAuth} from "./AuthContext";
import {useRouter} from "next/navigation";

export default function UserList() {
  const {currentUser} = useAuth();
  const router = useRouter();
  if(!currentUser?.is_admin) {
    router.replace('/not-found');
  }

  const [users, setUsers] = useState<User[] | null | undefined>(null);

  useEffect(() => {
    if(currentUser?.is_admin) {
      (async () => {
        const usersCollectionRef = collection(db, 'users');
        const snap = (await getDocs(usersCollectionRef)).docs.map(doc => doc.data());
        setUsers(snap as User[]);
      })();
    }
  }, [currentUser?.is_admin]);

  if (!users) {
    return <SkeletonCard length={10}/>
  }

  return (
    <VStack>
      {users && currentUser?.is_admin && users?.map((user: User, i) => <UserInfo key={i} {...user} />)}
    </VStack>
  )
}
