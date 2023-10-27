import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { firebaseGet } from "../service/firestore/firebaseGet";
import { useUserStore } from "../store/user.store";
import { UseFirebaseGet } from "@/utils/types/firebase";

function useGetCollection<T>({
  docReference,
  queryOptions,
  condition,
}: UseFirebaseGet): UseQueryResult<T[], unknown> {
  const { user } = useUserStore();
  const { staleTime, enabled } = queryOptions || {};

  const query = useQuery(
    [
      "collection",
      docReference.path,
      ...(docReference.pathSegments ? docReference.pathSegments : []),
    ],
    async () => {
      const data = await firebaseGet.getFirebaseCollection<T[]>({
        docReference: {
          path: docReference.path,
          ...(docReference.pathSegments
            ? { pathSegments: docReference.pathSegments }
            : {}),
        },
        ...(condition ? { condition } : {}),
      });
      return data as T[];
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

export default useGetCollection;
