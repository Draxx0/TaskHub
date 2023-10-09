import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { firebaseGet } from "../service/firebaseGet";
import { useUserStore } from "../store/user.store";

type Props = {
  path: string;
  pathSegments?: string[];
  queryOptions?: {
    staleTime?: number;
    enabled?: boolean;
  };
};

function useGetDoc<T>({
  path,
  pathSegments,
  queryOptions,
}: Props): UseQueryResult<T, unknown> {
  const { user } = useUserStore();
  const { staleTime, enabled } = queryOptions || {};

  const query = useQuery(
    ["doc", path, pathSegments],
    async () => {
      const data = await firebaseGet.getFirebaseDoc<T>({
        docReference: {
          path,
          pathSegments,
        },
      });
      return data as T;
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

export default useGetDoc;
