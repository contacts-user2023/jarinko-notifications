import UserNew from "@src/app/components/layout/UserNew";
import {getUser} from "@src/app/libs/serverUser";
import {redirect} from "next/navigation";

export default async function Page() {
  const currentUser = await getUser();
  if(!currentUser?.isAdmin) {
    redirect('/not-found');
  }

  return <UserNew/>
}
