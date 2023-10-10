import Error from "@/components/common/error/Error";
import SkeletonCard from "@/components/common/loader/SkeletonCard";
import useGetCollection from "@/hooks/useGetCollection";
import { Workshop } from "@/utils/types/workshop";
import WorkshopsItem from "./WorkshopsItem";
import { useUserStore } from "@/store/user.store";

const WorkshopsList = () => {
 const { user } = useUserStore();
 const { data: workshops, isLoading, isError } = useGetCollection<Workshop>({
  path: "workshops",
  condition: {
   leftConditon: "owner.id",
   operator: "==",
   rightCondition: user ? user.uid : ""
  }
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