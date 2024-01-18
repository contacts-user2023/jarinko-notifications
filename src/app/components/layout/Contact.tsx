import {
  Box,
  Card,
  Text,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import {getContactById} from "@src/app/libs/microcms";
import {toJSTString} from "@src/app/libs/dateFormatter";
import ReadAlertButton from "@src/app/components/ui/ReadAlertButton";
import BackButton from "@src/app/components/ui/BackButton";
import ReceivedTable from "@src/app/components/ui/ReceivedTable";
import {getUser} from "@src/app/libs/serverUser";
import parse from "html-react-parser";
import {redirect} from "next/navigation";

type Props = {
  id: string
};

export default async function Contact({id}: Props) {
  const user = await getUser();
  if (!user) {
    redirect('/');
  }

  const contact = await getContactById(id).catch(() => null);
  if (!contact) {
    return (
      <Card bg="#fafafa">
        <CardFooter justify="right">
          <ButtonGroup spacing={4}>
            <BackButton href="/contacts"/>
          </ButtonGroup>
        </CardFooter>
      </Card>
    );
  }

  const data = {
    date: toJSTString(contact.publishedAt),
    title: contact.title,
    body: contact.content
  };

  const contentStyles = {
    'h1, h2, h3, h4, h5, h6, p, ul, ol, figure, table, pre': {marginBottom: '1rem'},
    'li': {marginLeft: '1rem'},
    'hr': {margin: '1rem 0'},
    'table': {width: '100%', fontSize: '0.9rem'},
    'tr, th, td': {border: 'solid 1px #999'},
    'blockquote': {paddingLeft: '0.5rem', borderLeft: '3px solid #ccc'},
  };

  return (
    <Card bg="#fafafa">
      <CardHeader>
      <Text>{data.date}</Text>
      <Heading fontSize="2xl">{data.title}</Heading>
      <ReceivedTable id={id}/>
    </CardHeader>
      <CardBody>
        <Box as="div" sx={contentStyles}>
          {parse(data.body)}
        </Box>
      </CardBody>
      <CardFooter justify="right">
        <ButtonGroup spacing={4}>
          <BackButton href="/contacts"/>
          <ReadAlertButton
            contactId={id}
            name={user.name}
            memberId={user.uid}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
