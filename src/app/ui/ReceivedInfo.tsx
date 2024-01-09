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
  alreadyRead: boolean,
  contactId: string | number,
  postedAt: string,
  title: string
};

export default function ReceivedInfo({alreadyRead, contactId, postedAt, title}: Props) {

  return (
    <Link
      as={NextLink}
      href={`/contacts/${contactId}`}
      w="100%"
      _hover={{
        textDecoration: 'none',
        opacity: '0.7'
      }}
    >
      <Card
        w="100%"
        bg="#fafafa"
      >
        <CardBody>
          <HStack spacing={4} mb={1}>
            {
              alreadyRead
                ? <></>
                : <Badge colorScheme='red'>NEW</Badge>
            }
            <Text>{postedAt}</Text>
          </HStack>
          <Heading
            fontSize="md"
            overflow="hidden"
            textOverflow="ellipsis"
            display="-webkit-box"
            sx={{
              "WebkitLineClamp": "2",
              "WebkitBoxOrient": "vertical"
            }}
          >
            {title}
          </Heading>
        </CardBody>
      </Card>
    </Link>
  )
}
