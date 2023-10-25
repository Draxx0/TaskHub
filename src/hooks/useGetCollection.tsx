import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { firebaseGet } from "../service/firebaseGet";
import { useUserStore } from "../store/user.store";
import { FirebaseDoc, GetCollectionCondition } from "@/utils/types/firebase";

type Props<K = unknown> = {
  queryOptions?: {
    staleTime?: number;
    enabled?: boolean;
  };
  condition?: GetCollectionCondition<K>;
} & FirebaseDoc;

function useGetCollection<T, K = unknown>({
  docReference,
  queryOptions,
  condition,
}: Props<K>): UseQueryResult<T[], unknown> {
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
        condition,
      });
      return data as T[];
    },
    {
      staleTime: staleTime ?? Infinity,
      enabled: enabled ?? !!user,
      refetchOnWindowFocus: false,
    }
  );

  return {
    ...query,
  };
}

export default useGetCollection;
