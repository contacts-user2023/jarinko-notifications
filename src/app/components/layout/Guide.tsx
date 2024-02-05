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
import {getGuideById} from "@src/app/libs/microcms";
import BackButton from "@src/app/components/ui/BackButton";
import ReceivedTable from "@src/app/components/ui/ReceivedTable";
import {getUser} from "@src/app/libs/serverUser";
import parse from "html-react-parser";
import {redirect} from "next/navigation";

type Props = {
  id: string
};

export default async function Guide({id}: Props) {
  const user = await getUser();
  if (!user) {
    redirect('/');
  }

  const contact = await getGuideById(id).catch(() => null);
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
    title: contact.title,
    body: contact.content
  };

  const contentStyles = {
    'h1, h2, h3, h4, h5, h6, p, ul, ol, figure, table, pre': {marginBottom: '1rem'},
    'li': {marginLeft: '1rem'},
    'hr': {margin: '2rem 0'},
    'table': {width: '100%', fontSize: '0.9rem'},
    'tr, th, td': {border: 'solid 1px #999'},
    'blockquote': {paddingLeft: '0.5rem', borderLeft: '3px solid #ccc'},
    'figure': {marginBottom: '2rem', padding: '0.5rem', border: '1px solid #fca651'},
  };

  return (
    <Card bg="#fafafa">
      <CardHeader>
        <Heading fontSize="2xl">{data.title}</Heading>
      </CardHeader>
      <CardBody>
        <Box as="div" sx={contentStyles}>
          {data?.body ? parse(data.body) : <></>}
        </Box>
      </CardBody>
      <CardFooter justify="right">
        <ButtonGroup spacing={4}>
          <BackButton href="/guides"/>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
