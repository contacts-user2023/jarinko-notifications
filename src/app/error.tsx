'use client'

import {
  Card,
  Text,
  Image,
  HStack,
  Box,
  Heading,
  StackDivider,
} from '@chakra-ui/react'

export default function Page() {
  return (
    <HStack
      divider={<StackDivider/>}
    >
      <Heading fontSize="xl">500</Heading>
      <Heading fontSize="xl">ページでエラーが発生しました。</Heading>
    </HStack>
  )
}