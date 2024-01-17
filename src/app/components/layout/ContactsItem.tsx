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
  CardFooter,
  Link
} from '@chakra-ui/react';
import NextLink from 'next/link'
import ReactIcon from "../ui/ReactIcon";
import UnreadBadge from "@src/app/components/ui/UnreadBadge";

type Props = {
  alreadyRead: boolean,
  contactId: string | number,
  postedAt: string,
  title: string
};

export default function ContactsItem({alreadyRead, contactId, postedAt, title}: Props) {

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
        direction={{base: 'row'}}
      >
        <CardBody>
          <HStack spacing={4} mb={1}>
            <UnreadBadge contactId={contactId}/>
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
        <CardFooter alignSelf="center">
          <ReactIcon iconName="LuChevronRight"/>
        </CardFooter>
      </Card>
    </Link>
  )
}
