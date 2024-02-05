import {Suspense} from "react";
import SkeletonCard from "@src/app/components/ui/SkeletonCard";
import Guide from "@src/app/components/layout/Guide";

type Props = {
  params: {
    id: string
  }
};

export default function Page({params}: Props) {
  return (
    <Suspense fallback={<SkeletonCard length={1} type="single"/>}>
      <Guide id={params.id}/>
    </Suspense>
  );
}
