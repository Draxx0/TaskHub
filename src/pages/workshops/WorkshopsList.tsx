import Error from "@/components/common/error/Error";
import SkeletonCard from "@/components/common/loader/SkeletonCard";
import useGetCollection from "@/hooks/useGetCollection";
import { Workshop } from "@/utils/types/workshop";
import WorkshopsItem from "./WorkshopsItem";

const WorkshopsList = () => {
 const { data: workshops, isLoading, isError } = useGetCollection<Workshop>({
  path: "workshops",
 })

 return (
  <div className="grid grid-cols-4 gap-8">
   {isLoading ? (
    <>
     <SkeletonCard />
     <SkeletonCard />
     <SkeletonCard />
    </>
   ) : isError ? (
    <Error />
   ) : (
    workshops.map((workshop) => (
     <WorkshopsItem key={workshop.id} workshop={workshop} />
    ))
   )}
  </div>
 );
}

export default WorkshopsList;