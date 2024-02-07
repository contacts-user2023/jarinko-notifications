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
import {getHPURL, getInstagramURL} from "@/config/config";
import PushSubscriptionButton from "@src/app/components/ui/PushSubscriptionButton";
import SettingGroup from "@src/app/components/ui/SettingGroup";
import EmailSubscriptionButton from "@src/app/components/ui/EmailSubscriptionButton";

export default function Page() {
  return (
    <>
      <SettingGroup title="設定">
        <PushSubscriptionButton />
        {/*TODO メール通知*/}
        {/*<EmailSubscriptionButton/>*/}
      </SettingGroup>
      <SettingGroup title="リンク">
        <Link as={NextLink} href="/guides" py={2}>
          <HStack>
            <ReactIcon iconName='BiBookHeart' boxSize={6}/>
            <Text>ユーザーガイド</Text>
          </HStack>
        </Link>
        <Link as={NextLink} href={getInstagramURL()} target="_blank"  py={2}>
          <HStack>
            <ReactIcon iconName='BiLogoInstagram' boxSize={6}/>
            <Text>Instagram</Text>
          </HStack>
        </Link>
        <Link as={NextLink} href={getHPURL()} target="_blank"  py={2}>
          <HStack>
            <ReactIcon iconName='BiHome' boxSize={6}/>
            <Text>じゃりん子パワーホームページ</Text>
          </HStack>
        </Link>
      </SettingGroup>
      <ButtonGroup w="100%" justifyContent="right">
        <LogOutButton/>
      </ButtonGroup>
    </>
  )
}
