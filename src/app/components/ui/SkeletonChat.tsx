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
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={1} w="8rem"/>
      </OutgoingMessage>
      <OutgoingMessage message="" time="" received={false}>
        <SkeletonText startColor="green.100" endColor="green.500" skeletonHeight={2} noOfLines={1} w="5rem"/>
      </OutgoingMessage>
      <IncomingMessage message="" time="">
        <SkeletonText startColor="orange.100" endColor="orange.500" skeletonHeight={2} noOfLines={1} w="8rem"/>
      </IncomingMessage>
    </>
  );
}
