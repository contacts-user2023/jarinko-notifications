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
  const contact = await getContactById(id).catch(() => null);
  const user = await getUser();
  if (!user) {
    redirect('/');
  }

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

  return (
    <Card bg="#fafafa">
      <CardHeader>
      <Text>{data.date}</Text>
      <Heading fontSize="2xl">{data.title}</Heading>
      <ReceivedTable id={id}/>
    </CardHeader>
      <CardBody>
        <Box as="div">
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
