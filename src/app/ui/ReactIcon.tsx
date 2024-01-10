'use client';

import {
  LuThumbsUp,
  LuArrowBigLeft,
  LuLink,
  LuLogOut,
  LuNewspaper,
  LuPenSquare,
  LuMail,
  LuBell,
  LuSettings,
  LuMailCheck,
  LuBaby,
  LuUser2,
  LuKeyRound,
  LuLogIn,
  LuArrowBigRight,
  LuChevronRight,
} from "react-icons/lu";
import {
  IoMdLogIn,
  IoMdLogOut,
} from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import {Icon} from "@chakra-ui/react";

type IconName = string;
type Props = {
  iconName: IconName,
  boxSize?: number
};

const icon = {
  LuThumbsUp: LuThumbsUp,
  LuArrowBigLeft: LuArrowBigLeft,
  LuLink: LuLink,
  LuLogOut: LuLogOut,
  LuNewspaper: LuNewspaper,
  LuPenSquare: LuPenSquare,
  LuMail: LuMail,
  LuBell: LuBell,
  LuSettings: LuSettings,
  LuMailCheck: LuMailCheck,
  LuBaby: LuBaby,
  LuUser2: LuUser2,
  LuKeyRound: LuKeyRound,
  LuLogIn: LuLogIn,
  IoMdLogIn: IoMdLogIn,
  IoMdLogOut: IoMdLogOut,
  LuArrowBigRight: LuArrowBigRight,
  LuChevronRight: LuChevronRight,
};

const RIcon = (iconName: string): typeof Icon => {
  if (iconName in icon) {
    return icon[iconName as keyof typeof icon];
  }
  return FaRegQuestionCircle;
};

export default function ReactIcon(props: Props) {
  return <Icon boxSize={props?.boxSize || 4} as={RIcon(props.iconName)}/>
}
