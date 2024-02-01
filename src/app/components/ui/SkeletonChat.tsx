import {Skeleton, SkeletonText} from "@chakra-ui/react";
import OutgoingMessage from "@src/app/components/ui/OutgoingMessage";
import DateDivider from "@src/app/components/ui/DateDivider";
import IncomingMessage from "@src/app/components/ui/IncomingMessage";

export default function SkeletonChat() {
  return (
    <>
      <DateDivider ms={0}>
        <Skeleton w="6rem" h="0.5rem"/>
      </DateDivider>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={1} w="5rem"/>
      </OutgoingMessage>
      <IncomingMessage message="" time="">
        <SkeletonText startColor="orange.100" endColor="orange.500" skeletonHeight={2} noOfLines={3} w="10rem"/>
      </IncomingMessage>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={1} w="9rem"/>
      </OutgoingMessage>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={1} w="6rem"/>
      </OutgoingMessage>
      <IncomingMessage message="" time="">
        <SkeletonText startColor="orange.100" endColor="orange.500" skeletonHeight={2} noOfLines={1} w="6rem"/>
      </IncomingMessage>
      <IncomingMessage message="" time="">
        <SkeletonText startColor="orange.100" endColor="orange.500" skeletonHeight={2} noOfLines={1} w="4rem"/>
      </IncomingMessage>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={2} w="10rem"/>
      </OutgoingMessage>
      <DateDivider ms={0}>
        <Skeleton w="6rem" h="0.5rem"/>
      </DateDivider>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={1} w="9rem"/>
      </OutgoingMessage>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.800" skeletonHeight={2} noOfLines={1} w="6rem"/>
      </OutgoingMessage>
      <IncomingMessage message="" time="">
        <SkeletonText startColor="orange.100" endColor="orange.800" skeletonHeight={2} noOfLines={1} w="6rem"/>
      </IncomingMessage>
    </>
  );
}
