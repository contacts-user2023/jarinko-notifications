import Contacts from "@src/app/components/layout/Contacts";
import {Suspense} from "react";
import SkeletonCard from "@src/app/components/ui/SkeletonCard";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonCard length={10} type="multiple"/>}>
      <Contacts/>
    </Suspense>
  )
}
