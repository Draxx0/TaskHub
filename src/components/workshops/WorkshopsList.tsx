import Error from "@/components/common/error/Error";
import SkeletonCard from "@/components/common/loader/SkeletonCard";
import useGetCollection from "@/hooks/useGetCollection";
import { Workshop } from "@/utils/types/workshop";
import WorkshopsItem from "./WorkshopsItem";
import { useUserStore } from "@/store/user.store";
import { getCurrentUserDoc } from "@/service/firestore/getCurrentUserDoc";
import { useCallback, useEffect, useState } from "react";
import { DocumentData, DocumentReference } from "firebase/firestore";

const WorkshopsList = () => {
  const [currentUserRef, setCurrentUserRef] = useState<
    DocumentReference<DocumentData, DocumentData> | undefined
  >(undefined);
  const { user } = useUserStore();

  const fetchCurrentUserRef = useCallback(async () => {
    if (user) {
      const currentUser = await getCurrentUserDoc<DocumentReference>(user.uid);
      setCurrentUserRef(currentUser);
    }
  }, [user]);

  useEffect(() => {
    fetchCurrentUserRef();
  }, [fetchCurrentUserRef]);

  const {
    data: workshops,
    isLoading,
    isError,
  } = useGetCollection<Workshop>({
    docReference: {
      path: "workshops",
    },
    condition: {
      leftConditon: "owner",
      operator: "==",
      rightCondition: currentUserRef,
    },
    queryOptions: {
      enabled: !!currentUserRef,
    },
  });
  console.log("WORKSHOPS", workshops);
  return (
    <div
      className={`grid grid-cols-4 gap-8 ${
        workshops && workshops.length === 0 && "relative h-[65vh]"
      }`}
    >
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : workshops ? (
        workshops.length > 0 ? (
          workshops.map((workshop) => (
            <WorkshopsItem key={workshop.id} workshop={workshop} />
          ))
        ) : (
          <div className="flex flex-col items-center absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
            <img src="../assets/icons/empty-workshops-img.svg" alt="" />
            <p className="text-black/75">
              Vous n'avez pour l'instant aucun ateliers
            </p>
          </div>
        )
      ) : isError ? (
        <Error />
      ) : null}
    </div>
  );
};

export default WorkshopsList;
