import Chat from "@src/app/components/layout/Chat";
import {getUser} from "@src/app/libs/serverUser";
import {getAuth} from "firebase-admin/auth";

type Props = {
  params: {
    id: string
  }
};

export default async function Page ({params}: Props) {
  const currentUser = await getUser();
  let partnerName = '';

  if (currentUser?.isAdmin) {
    const auth = getAuth();
    try {
      const result = await auth.getUser(params.id);
      partnerName = result?.displayName || 'unknown';
    } catch(e) {
      console.log(e);
    }
  } else {
    partnerName = 'システム管理者';
  }

  return <Chat toUid={params.id} partnerName={partnerName}/>
}
