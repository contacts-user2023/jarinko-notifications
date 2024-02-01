import {AbsoluteCenter, Box, Divider, Center, Tag } from "@chakra-ui/react";
import {toJSTDateString} from "@src/app/libs/dateFormatter";
import {ReactNode} from "react";

type Props = {
  ms: number
  children?: ReactNode
};

export default function DateDivider({ms, children}: Props) {
  return (
    <Box position="sticky" zIndex="sticky" top="110px">
      <Center my={10}>
        <Tag px={3} size="sm">
          {
            children
              ? children
              : toJSTDateString(ms)
          }
        </Tag>
      </Center>
    </Box>
  )
}
