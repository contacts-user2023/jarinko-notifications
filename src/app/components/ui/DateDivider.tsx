import {AbsoluteCenter, Box, Divider, Center, Tag } from "@chakra-ui/react";
import {toJSTDateString} from "@src/app/libs/dateFormatter";

type Props = {
  ms: number
};

export default function DateDivider({ms}: Props) {
  return (
    <Box position="sticky" zIndex="sticky" top="110px">
      <Center my={10}>
        <Tag px={3} size="sm">{toJSTDateString(ms)}</Tag>
      </Center>
    </Box>
  )
}
