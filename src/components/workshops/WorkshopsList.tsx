import Error from "@/components/common/error/Error";
import SkeletonCard from "@/components/common/loader/SkeletonCard";
import useGetCollection from "@/hooks/useGetCollection";
import { Workshop } from "@/utils/types/workshop";
import WorkshopsItem from "./WorkshopsItem";
import { useUserStore } from "@/store/user.store";

const WorkshopsList = () => {
  const { user } = useUserStore();

  const {
    data: workshops,
    isLoading,
    isError,
  } = useGetCollection<Workshop>({
    docReference: {
      path: "workshops",
    },
    condition: {
      leftConditon: "ownerId",
      operator: "==",
      rightCondition: user?.uid,
    },
    queryOptions: {
      enabled: !!user,
    },
  });
  console.log("WORKSHOPS", workshops);
  // console.log("currentUser", currentUserRef);
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
