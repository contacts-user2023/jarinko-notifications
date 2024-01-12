import Users from "@src/app/components/layout/Users";
import {getUser} from "@src/app/libs/serverUser";
import {redirect} from "next/navigation";

export default async function Page() {
  const currentUser = await getUser();
  if(!currentUser?.isAdmin) {
    redirect('/not-found');
  }

  return <Users/>
}
