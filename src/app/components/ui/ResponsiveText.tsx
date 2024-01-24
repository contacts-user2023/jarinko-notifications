'use client';

import { useBreakpointValue, Text} from "@chakra-ui/react";

type Props = {
  text: string,
  responsiveText: string,
  boundary: 'xs' | 'sm' | 'md' | 'lg'
};

export default function ResponsiveText({text, boundary, responsiveText}: Props) {
  const displayText = useBreakpointValue({ base: text, [boundary]: text + responsiveText});

  return <Text>{displayText}</Text>
}
