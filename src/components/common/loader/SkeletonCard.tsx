import { Skeleton } from "@/components/ui/skeleton";

const SkeletonCard = () => {
 return (
  <div className="flex flex-col gap-2">
   <Skeleton className="h-12" />
   <div className="space-y-2">
    <Skeleton className="h-4" />
    <Skeleton className="h-4" />
   </div>
  </div>
 );
}

export default SkeletonCard;