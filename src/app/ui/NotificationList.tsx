import {
  Card,
  Text,
  Image,
  HStack,
  Center,
  Heading,
  Box,
  StackDivider,
  Divider,
  Badge,
  CardBody,
  VStack,
} from '@chakra-ui/react';
import NotificationInfo from "./NotificationInfo";

export default function NotificationList() {

  return (
    <VStack >
      <NotificationInfo notificationId={1} postedAt='2023.12.14' title='リリースしました'/>
    </VStack>
  )
}
