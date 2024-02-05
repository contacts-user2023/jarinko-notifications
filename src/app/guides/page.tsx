import {Suspense} from "react";
import SkeletonCard from "@src/app/components/ui/SkeletonCard";
import Guides from "@src/app/components/layout/Guides";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonCard length={10} type="multiple"/>}>
      <Guides/>
    </Suspense>
  )
}
