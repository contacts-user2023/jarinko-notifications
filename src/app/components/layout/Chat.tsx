import {HStack, Text, Spacer, Link} from '@chakra-ui/react';
import ReactIcon from "@src/app/components/ui/ReactIcon";
import NextLink from "next/link";
import ChatItems from "@src/app/components/layout/ChatItems";
import {getUser} from "@src/app/libs/serverUser";

type Props = {
  toUid?: string,
  partnerName: string,
};

export default async function Chat({toUid, partnerName}: Props) {
  const currentUser = await getUser();

  return (
    <>
      <HStack
        pt="75px"
        pb={2}
        px={4}
        position="fixed"
        zIndex="dropdown"
        left={0}
        width="100%"
        top="0"
        bg="gray.50"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Link
          as={NextLink}
          href={currentUser?.isAdmin ? "/users" : "/contacts"}
          _hover={{
            textDecoration: 'none',
            opacity: '0.7'
          }}
        >
          <ReactIcon iconName="LuChevronLeft"/>
        </Link>
        <Text>{partnerName}</Text>
        <Spacer/>
      </HStack>
      <ChatItems toUid={toUid} />
    </>
  );
}
