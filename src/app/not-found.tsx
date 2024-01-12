import {
  HStack,
  Heading,
  StackDivider,
  ButtonGroup,
} from '@chakra-ui/react'
import BackButton from "@src/app/components/ui/BackButton";

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
