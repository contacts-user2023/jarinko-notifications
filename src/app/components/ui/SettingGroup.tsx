import {
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import {ReactNode} from "react";
import ReactIcon from "@src/app/components/ui/ReactIcon";

type Props = {
  title: string,
  children: ReactNode
};

export default function SettingGroup({title, children}: Props) {
  return (
    <VStack
      border="solid #ddd"
      borderRadius="0.5rem"
      position="relative"
      alignItems="flex-start"
      p={4}
      mb={10}
    >
      <HStack
        position="absolute"
        top="-0.8rem"
        left="0.5rem"
        spacing={1}
        px={2}
        bg="white"
      >
        <Text>{title}</Text>
      </HStack>
      {children}
    </VStack>
  );
}
