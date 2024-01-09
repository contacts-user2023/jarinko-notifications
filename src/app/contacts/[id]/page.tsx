import {
  Card,
  Text,
  Heading,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import {getContactById, listAlreadyReadByContentId} from "../../libs/microcms";
import {toJSTString} from "../../libs/dateFormatter";
import ReadAlertButton from "../../ui/ReadAlertButton";
import BackButton from "../../ui/BackButton";
import ReceivedTable from "../../ui/ReceivedTable";

type Props = {
  params: {
    id: string
  }
};

export default async function Page({params}: Props) {
  const contact = await getContactById(params.id).catch(() => null);

  if (!contact) {
    return (
      <Card bg="#fafafa">
        <CardFooter justify="right">
          <ButtonGroup spacing={4}>
            <BackButton href="/contacts" />
          </ButtonGroup>
        </CardFooter>
      </Card>
    )
  }

  const data = {
    date: toJSTString(contact.publishedAt),
    title: contact.title,
    body: contact.content
  };

  return (
    <>
      <Card bg="#fafafa">
        <CardHeader>
          <Text>{data.date}</Text>
          <Heading fontSize="2xl">{data.title}</Heading>
          <ReceivedTable id={params.id}/>
        </CardHeader>
        <CardBody>
          <Text as="div" dangerouslySetInnerHTML={{__html: data.body}}/>
        </CardBody>
        <CardFooter justify="right">
          <ButtonGroup spacing={4}>
            <BackButton href="/contacts" />
            <ReadAlertButton
              contactId={params.id}
            />
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  )
}
