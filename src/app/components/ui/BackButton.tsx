import {Button} from "@chakra-ui/react";
import ReactIcon from "./ReactIcon";

type Props = {href: string, to?: string};

export default function BackButton({href, to = '一覧'}: Props) {

  return <Button
    colorScheme="gray"
    variant='outline'
    as="a"
    href={href}
    rightIcon={<ReactIcon iconName='LuArrowBigLeft'/>}
  >
    {to}へ戻る
  </Button>
}
