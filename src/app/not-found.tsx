'use client'

import {
  Card,
  Text,
  Image,
  HStack,
  Box,
  Heading,
  StackDivider,
  ButtonGroup, VStack,
} from '@chakra-ui/react'
import BackButton from "./ui/BackButton";

export default function Page() {
  return (
    <>
      <HStack
        divider={<StackDivider/>}
      >
        <Heading fontSize="xl">404</Heading>
        <Heading fontSize="xl">ページが存在しません。</Heading>
      </HStack>
      <ButtonGroup w="100%" mt={10} justifyContent="right">
        <BackButton href="/contacts"/>
      </ButtonGroup>
    </>
  )
}
