import {Card, CardBody, SkeletonText, VStack} from "@chakra-ui/react";

type Props = {
  length: number,
  type: 'multiple' | 'single'
};

export default function SkeletonCard({length, type}: Props) {
  const skeletonCards = Array.from({length}, (_, index) => (
    <Card key={index} w="100%" bg='#fafafa'>
      <CardBody>
        {
          type === 'multiple'
            ? (
              <>
                <SkeletonText w="25%" noOfLines={1} skeletonHeight='3'/>
                <SkeletonText mt='4' noOfLines={1} skeletonHeight='4' />
              </>
            ) : (
              <>
                <SkeletonText w="25%" noOfLines={1} skeletonHeight='3'/>
                <SkeletonText w="75%" mt='4' noOfLines={1} skeletonHeight='5'/>
                <SkeletonText mt='10' noOfLines={10} skeletonHeight='4'/>
              </>
            )

        }
      </CardBody>
    </Card>
  ));

  return <VStack>{skeletonCards}</VStack>;
}
