import {Button} from "@chakra-ui/react";
import ReactIcon from "./ReactIcon";

type Props = {href: string};

export default function BackButton({href}: Props) {

  return <Button
    colorScheme="gray"
    variant='outline'
    as="a"
    href={href}
    rightIcon={<ReactIcon iconName='LuArrowBigLeft'/>}
  >
    一覧へ戻る
  </Button>
}
