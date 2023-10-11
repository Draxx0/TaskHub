import Error from "@/components/common/error/Error";
import SkeletonCard from "@/components/common/loader/SkeletonCard";
import useGetCollection from "@/hooks/useGetCollection";
import { Workshop } from "@/utils/types/workshop";
import WorkshopsItem from "./WorkshopsItem";
import { useUserStore } from "@/store/user.store";
import { getCurrentUserDoc } from "@/service/functions/getCurrentUserDoc";
import { useCallback, useEffect, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";

const WorkshopsList = () => {
 const [currentUserRef, setCurrentUserRef] = useState<DocumentReference<DocumentData, DocumentData> | undefined>(undefined);
 const { user } = useUserStore();

 const fetchCurrentUserRef = useCallback(async () => {
  if (user) {
   const currentUser = await getCurrentUserDoc<DocumentReference>(user.uid);
   console.log("CURRENT USER HERE BRO", currentUser)
   setCurrentUserRef(currentUser);
  }
 }, [user])

 useEffect(() => {
  fetchCurrentUserRef();
 }, [fetchCurrentUserRef]);


 const { data: workshops, isLoading, isError } = useGetCollection<Workshop>({
  path: "workshops",
  condition: {
   leftConditon: "owner",
   operator: "==",
   rightCondition: currentUserRef
  },
  queryOptions: {
   enabled: !!currentUserRef
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