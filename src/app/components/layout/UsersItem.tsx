import {
  Card,
  Text,
  HStack,
  Badge,
  CardBody,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link'

type Props = {
  name: string,
  is_admin?: boolean,
  uid: string,
};

export default function UsersItem({name, is_admin, uid}: Props) {
  return (
    <Link
      as={NextLink}
      href={`/users/${uid}`}
      w="100%"
      _hover={{
        textDecoration: 'none',
        opacity: '0.7'
      }}
    >
      <Card
        w="100%"
        bg="#fafafa"
        direction={{base: 'column', sm: 'row'}}
      >
        <CardBody>
          <HStack spacing={4} mb={1}>
            <Badge
              colorScheme={is_admin ? 'green' : 'yellow'}
              minW="3rem"
              style={{textAlign: 'center'}}
            >
              {is_admin ? '管理者' : '一 般'}
            </Badge>
            <Text>{name}</Text>
          </HStack>
        </CardBody>
      </Card>
    </Link>
  )
}
