import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import {ReactNode} from "react";

type Props = {
  time: string,
  message: string,
  children?: ReactNode
};

export default function IncomingMessage({time, message, children}: Props) {
  return (
    <HStack justify="left" my={2}>
      <VStack maxW="45%" align="left" spacing={0}>
        <Text fontSize="xs">{time}</Text>
        <Box
          ml={3}
          p={2}
          fontSize="sm"
          w="100%"
          bg='orange.100'
          color="orange.800"
          borderRadius="0.5rem"
          position="relative"
          _before={{
            content: "''",
            position: "absolute",
            top: "35%",
            left: "-0.8rem",
            marginTop: "-0.5rem",
            border: "0.5rem solid transparent",
            borderRight: "0.5rem solid",
            borderRightColor: "orange.100",
          }}
        >
          {message.split("\n").map((v, i) => (<Text key={i}>{v}</Text>))}
          {children}
        </Box>
      </VStack>
    </HStack>
  );
}
