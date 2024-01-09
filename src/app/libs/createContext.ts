import {createContext, useContext} from 'react';
import {User} from "./firebaseConfig";

type FirebaseAuthContextProps = {
  currentUser: User | undefined;
}

const FirebaseAuthContext = createContext<FirebaseAuthContextProps>({
  currentUser: undefined,
});
export {FirebaseAuthContext}

export const useFirebaseAuthContext = () => useContext(FirebaseAuthContext);
