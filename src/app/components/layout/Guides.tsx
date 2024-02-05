import {
  Card,
  CardBody, CardFooter,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import {Guide, listGuides} from "@src/app/libs/microcms";
import {getUser} from "@src/app/libs/serverUser";
import {redirect} from 'next/navigation';
import NextLink from "next/link";
import ReactIcon from "@src/app/components/ui/ReactIcon";
import {Fragment} from "react";

export default async function Guides() {
  const user = await getUser();
  if (!user) {
    redirect('/')
  }

  const guides = await listGuides();

  return (
    <VStack align="left">
      <Text fontSize="2xl" mb={10}>ユーザーガイド</Text>
      {
        guides?.contents && guides.contents.map((guide: Guide, i) => {
          if (guide?.category?.name === 'admin' && !user.isAdmin) {
            return <Fragment key={i}></Fragment>;
          }

          return (
            <Link
              key={i}
              as={NextLink}
              href={`guides/${guide.id}`}
              _hover={{
                textDecoration: 'none',
                opacity: '0.7'
              }}
            >
              <Card direction="row">
                <CardBody>
                  <Text>{guide.title}</Text>
                </CardBody>
                <CardFooter alignSelf="center">
                  <ReactIcon iconName="LuChevronRight"/>
                </CardFooter>
              </Card>
            </Link>
          );
        })
      }
    </VStack>
  )
}
