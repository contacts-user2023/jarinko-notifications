import {Suspense} from "react";
import SkeletonCard from "@src/app/components/ui/SkeletonCard";
import Contact from "@src/app/components/layout/Contact";

type Props = {
  params: {
    id: string
  }
};

export default function Page({params}: Props) {
  return (
    <Suspense fallback={<SkeletonCard/>}>
      <Contact id={params.id}/>
    </Suspense>
  );
}
