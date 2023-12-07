import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useInfiniteQuery } from '@tanstack/react-query';

const useSearchThemeInfiniteQuery = (query: string) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, refetch } = useInfiniteQuery({
    queryKey: [QUERY_MANAGEMENT['themeSearchResult'].key, query],
    queryFn: ({ pageParam }) => QUERY_MANAGEMENT['themeSearchResult'].fn({ pageParam, query }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage._meta.nextPage;
    },
  });

  return { data, fetchNextPage, hasNextPage, error, isFetching, refetch };
};

export default useSearchThemeInfiniteQuery;
