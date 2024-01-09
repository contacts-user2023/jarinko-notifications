'use client';

import React, {useEffect, useState, ReactNode} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {firebaseApp, getAuth, db, User} from "../libs/firebaseConfig";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import {FirebaseAuthContext, useFirebaseAuthContext} from "../libs/createContext";

const FirebaseAuthProvider = ({children}: {children: ReactNode}) => {
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth(firebaseApp);
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // authはnullの可能性があるので、useEffectの第二引数にauthを指定しておく
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        (async() => {
          const ref = doc(db, 'users', user.uid);
          const snap = (await getDoc(ref)).data();
          setCurrentUser(snap as User);
          setIsLoading(false);
        })();
      } else if(pathname !== '/') {
        router.push('/');
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => {
      unsubscribed()
    }
  }, [auth, pathname, router]);
  return (
    <FirebaseAuthContext.Provider value={{currentUser: currentUser}}>
      {!isLoading && children}
    </FirebaseAuthContext.Provider>
  )
};

export {FirebaseAuthContext, FirebaseAuthProvider}

export const useAuth = () => useFirebaseAuthContext();
