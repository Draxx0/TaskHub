import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { firebaseGet } from "../service/firebaseGet";
import { useUserStore } from "../store/user.store";
import { GetCollectionCondition } from "@/utils/types/firebase";

type Props = {
  path: string;
  queryOptions?: {
    staleTime?: number;
    enabled?: boolean;
  };
  condition?: GetCollectionCondition
};

function useGetCollection<T>({
  path,
  queryOptions,
  condition
}: Props): UseQueryResult<T[], unknown> {
  const { user } = useUserStore();
  const { staleTime, enabled } = queryOptions || {};

  const query = useQuery(
    ["collection", path],
    async () => {
      const data = await firebaseGet.getFirebaseCollection<T[]>({
        params: {
          path,
        },
        condition
      });
      return data as T[];
    },
    {
      staleTime: staleTime ?? Infinity,
      enabled: enabled ?? !!user,
      refetchOnWindowFocus: false
    }
  );

  return {
    ...query,
  };
}

export default useGetCollection;
