import {
  Image,
  HStack,
  Center,
  Heading,
} from '@chakra-ui/react';

export default function Header() {
  const month = new Date().getMonth() + 1;

  return (
    <Center
      position="sticky"
      top={0}
      left={0}
      zIndex="sticky"
    >
      <HStack
        w="100%"
        spacing={4}
        justify="center"
        pt={2}
        pb={3}
        mb={5}
        bg="#fcfaf2"
        color="#38270f"
        borderBottom="1px solid"
        borderBottomColor="gray.300"
      >
        <Heading fontSize="2xl">
          じゃりん子パワー連絡帳
        </Heading>
        <Image src={`/header/month_${month}.png`} alt={`${month}月`} w="2.5rem" h="2.5rem"/>
      </HStack>
    </Center>
  )
}
