import {
  Card,
  Text,
  VStack,
  Avatar,
  AvatarBadge,
  Link,
} from '@chakra-ui/react';
import NextLink from 'next/link'
import ReactIcon from "./ReactIcon";

type Props = {
  name: string,
  iconName: string,
  isBadge?: boolean,
  href: string,
  target: string,
  current: boolean
};
export default function NavItem({name, iconName, isBadge, href, target, current}: Props) {
  return (
    <Link
      as={NextLink}
      href={href}
      target={target}
      w="100%"
      _hover={{opacity: 0.7}}
    >
      <Card
        bg={current ? 'orange.100' : 'gray.100'}
        align="center"
        py={2}
        flex={1}
      >
        <VStack spacing={1}>
          <Avatar bg="white" color="black" icon={<ReactIcon iconName={iconName} boxSize={10} />}>
            {
              isBadge
                ? <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em'/>
                : <></>
            }
          </Avatar>
          <Text fontSize="xs">{name}</Text>
        </VStack>
      </Card>
    </Link>
  )
}
