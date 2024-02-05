import {
  Text,
  HStack,
  VStack,
  Link,
  ButtonGroup,
} from '@chakra-ui/react';
import NextLink from 'next/link'
import ReactIcon from "@src/app/components/ui/ReactIcon";
import LogOutButton from "@src/app/components/ui/LogOutButton";
import {getHPURL} from "@/config/config";

export default function Page() {
  return (
    <>
      <VStack spacing={6} mb={20} align="left">
        <Link as={NextLink} href={getHPURL()} target="_blank">
          <HStack>
            <ReactIcon iconName='LuLink'/>
            <Text>じゃりん子パワーホームページ</Text>
          </HStack>
        </Link>
        <Link as={NextLink} href="/guides">
          <HStack>
            <ReactIcon iconName='LuBookOpen'/>
            <Text>ユーザーガイド</Text>
          </HStack>
        </Link>
      </VStack>
      <ButtonGroup w="100%" justifyContent="right">
        <LogOutButton/>
      </ButtonGroup>
    </>
  )
}
