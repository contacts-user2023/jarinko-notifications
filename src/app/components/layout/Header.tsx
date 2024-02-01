import {
  Image,
  HStack,
  Center,
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
        spacing={2}
        pl={4}
        py={2}
        mb={5}
        bg="#fcfaf2"
        color="#38270f"
        borderBottom="1px solid"
        borderBottomColor="gray.300"
      >
        <Image src={`/header/month_${month}.webp`} alt={`${month}月`} w="2.5rem" h="2.5rem"/>
        <Image src="/header/header-logo.svg" w="150px" alt="じゃりん子パワー連絡帳" />
      </HStack>
    </Center>
  )
}
