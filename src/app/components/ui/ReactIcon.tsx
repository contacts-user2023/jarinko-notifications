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
  LuFilePlus,
  LuPencil,
  LuTrash2,
  LuSend,
  LuChevronLeft,
  LuLightbulbOff,
  LuLightbulb,
  LuArrowDownToLine,
  LuBookOpen,
} from "react-icons/lu";
import {
  IoMdLogIn,
  IoMdLogOut,
} from "react-icons/io";
import {FaRegQuestionCircle} from "react-icons/fa";
import {MdLockReset} from "react-icons/md";
import {BsChatDots} from "react-icons/bs";
import {PiToggleRightFill, PiToggleLeft, PiDotsThreeBold} from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { BiHome, BiBookHeart, BiLogoInstagram } from "react-icons/bi";
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
  LuFilePlus: LuFilePlus,
  LuPencil: LuPencil,
  LuTrash2: LuTrash2,
  MdLockReset: MdLockReset,
  LuSend: LuSend,
  BsChatDots: BsChatDots,
  LuChevronLeft: LuChevronLeft,
  LuLightbulbOff: LuLightbulbOff,
  LuLightbulb: LuLightbulb,
  LuArrowDownToLine: LuArrowDownToLine,
  PiToggleRightFill,
  PiToggleLeft,
  LuBookOpen,
  PiDotsThreeBold,
  GoCommentDiscussion,
  BiHome,
  BiBookHeart,
  BiLogoInstagram,
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
