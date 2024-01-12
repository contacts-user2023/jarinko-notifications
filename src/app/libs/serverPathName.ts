import {headers} from "next/headers";

export const getPathName = () => {
  const headersList = headers();
  // read the custom x-url header
  return headersList.get('x-path') || "";
};
