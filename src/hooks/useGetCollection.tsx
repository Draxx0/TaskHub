import { UseQueryResult, useQuery } from "@tanstack/react-query";
import firebaseService from "../service/firebase.service";
import { useUserStore } from "../store/user.store";

type Props = {
  path: string;
  queryOptions?: {
    staleTime?: number;
    enabled?: boolean;
  };
};

function useGetCollection<T>({
  path,
  queryOptions,
}: Props): UseQueryResult<T[], unknown> {
  const { user } = useUserStore();
  const { staleTime, enabled } = queryOptions || {};

  const query = useQuery(
    ["collection", path],
    async () => {
      const data = await firebaseService.getFirebaseCollection<T[]>({
        params: {
          path,
        },
      });
      return data as T[];
    },
    {
      staleTime: staleTime ?? Infinity,
      enabled: enabled ?? !!user,
    }
  );

  return {
    ...query,
  };
}

export default useGetCollection;
