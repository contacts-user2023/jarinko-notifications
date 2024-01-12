import User from "@src/app/components/layout/User";
import {getUser} from "@src/app/libs/serverUser";
import {redirect} from "next/navigation";

type Props = {
  params: {
    id: string
  }
};

export default async function Page({params}: Props) {
  const currentUser = await getUser();
  if (!currentUser?.isAdmin) {
    redirect('/not-found');
  }

  return (
    <User id={params.id}/>
  )
};
