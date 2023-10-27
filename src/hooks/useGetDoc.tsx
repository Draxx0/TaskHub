import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { firebaseGet } from "../service/firestore/firebaseGet";
import { useUserStore } from "../store/user.store";
import { UseFirebaseGet } from "@/utils/types/firebase";
type Props = {
  getSubCollectionData?: {
    path: string;
    pathSegments?: string[];
  };
};
function useGetDoc<T>({
  docReference,
  condition,
  queryOptions,
  getSubCollectionData,
}: UseFirebaseGet & Props): UseQueryResult<T, unknown> {
  const { user } = useUserStore();
  const { staleTime, enabled } = queryOptions || {};
  const { path, pathSegments } = docReference;

  const query = useQuery(
    ["doc", path, ...(pathSegments ? pathSegments : [])],
    async () => {
      const data = await firebaseGet.getFirebaseDoc<T>({
        docReference: {
          path,
          pathSegments,
        },
        getSubCollectionData,
        ...(condition ? { condition } : {}),
      });
      return data as T;
    },
    {
      staleTime: staleTime ?? Infinity,
      enabled: (!!user && enabled) ?? !!user,
      refetchOnWindowFocus: false,
    }
  );

  return {
    ...query,
  };
}

export default useGetDoc;
