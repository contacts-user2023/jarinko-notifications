import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import {toJSTString} from "@src/app/libs/dateFormatter";
import {getUser} from "@src/app/libs/serverUser";
import {adminDb} from "@src/app/libs/firebaseAdminConfig";
import {getAuth, UserRecord} from "firebase-admin/auth";
import ReceivedAccordionItem from "@src/app/components/ui/ReceivedAccordionItem";

type Props = {
  id: string,
};

export default async function ReceivedAccordion({id}: Props) {
  const user = await getUser();
  if(!user || !user?.isAdmin) {
    return <></>;
  }
  const docRef = adminDb.collection('receives').doc(id);
  const snap = await docRef.get();
  const snapData = snap?.data()?.received || [];
  const alreadyReads = snapData.map((snap: {[key: string]: any}) => {
    return {
      uid: snap.uid,
      timestamp: snap.timestamp.toMillis()
    }
  });

  const auth = getAuth();
  const listUsers = (await auth.listUsers()).users;
  const users = listUsers.map((user: UserRecord) => {
    return {
      displayName: user?.displayName,
      uid: user.uid,
      disabled: user.disabled,
    }
  });

  return (user.isAdmin &&
    <Accordion mt={4} allowToggle>
      <ReceivedAccordionItem alreadyReads={alreadyReads} users={users} />
    </Accordion>
  )
}
