import {AbsoluteCenter, Box, Divider} from "@chakra-ui/react";
import {toJSTDateString} from "@src/app/libs/dateFormatter";

type Props = {
  ms: number
};

export default function DateDivider({ms}: Props) {
  return (
    <Box position='relative' p={10}>
      <Divider />
      <AbsoluteCenter bg='white' px={2} fontSize="xs">
        {toJSTDateString(ms)}
      </AbsoluteCenter>
    </Box>
  )
}
