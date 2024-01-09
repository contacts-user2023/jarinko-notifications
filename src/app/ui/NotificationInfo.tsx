import {
  Card,
  Text,
  Image,
  HStack,
  Center,
  Heading,
  Box,
  StackDivider,
  Divider,
  Badge,
  CardBody,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link'

type Props = {
  notificationId: string | number,
  postedAt: string,
  title: string
};

export default function NotificationInfo({notificationId, postedAt, title}: Props) {

  return (
    <Link
      as={NextLink}
      href={`/notifications/${notificationId}`}
      w="100%"
      _hover={{
        textDecoration: 'none',
        opacity: '0.7'
      }}
    >
      <Card w="100%">
        <CardBody>
          <HStack spacing={4} mb={1}>
            <Text>{postedAt}</Text>
          </HStack>
          <Heading fontSize="md">
            {title}
          </Heading>
        </CardBody>
      </Card>
    </Link>
  )
}
