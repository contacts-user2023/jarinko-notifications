import {getServerSession} from "next-auth/next";
import {authOptions} from "@src/app/options";

export const getUser = async() => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return user || null;
};
