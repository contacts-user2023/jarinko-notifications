import {Box, HStack, Text, VStack} from "@chakra-ui/react";

type Props = {
  time: string,
  message: string,
  received: boolean,
};

export default function OutgoingMessage({time, message, received}: Props) {
  return (
    <HStack justify="right" my={2}>
      <VStack maxW="45%" align="left" spacing={0}>
        <Text fontSize="xs">{time} {received ? '既読' : ''}</Text>
        <Box
          mr={3}
          p={2}
          fontSize="sm"
          w="100%"
          bg='green.100'
          color="green.800"
          borderRadius="0.5rem"
          position="relative"
          _before={{
            content: "''",
            position: "absolute",
            top: "35%",
            right: "-0.8rem",
            marginTop: "-0.5rem",
            border: "0.5rem solid transparent",
            borderLeft: "0.5rem solid",
            borderLeftColor: "green.100",
          }}
        >
          {message.split("\n").map((v, i) => (<Text key={i}>{v}</Text>))}
        </Box>
      </VStack>
    </HStack>
  );
}
