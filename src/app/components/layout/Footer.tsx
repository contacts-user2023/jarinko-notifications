import {
  Text,
  Center,
} from '@chakra-ui/react';
import {getVersion} from "@/config/config";

export default function Footer() {

  return (
    <Center
      mt={10}
      pt={10}
      pb={5}
      color="#38270f"
      alignItems="baseline"
    >
      <Text>©{new Date().getFullYear()} じゃりん子パワー</Text>
      <Text fontSize="xs" ml={2}>{getVersion()}</Text>
    </Center>
  )
}
