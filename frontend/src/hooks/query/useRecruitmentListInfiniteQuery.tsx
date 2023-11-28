import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useInfiniteQuery } from '@tanstack/react-query';

const useRecruitmentListInfiniteQuery = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [QUERY_MANAGEMENT['recruitmentList'].key],
    queryFn: ({ pageParam }) =>
      QUERY_MANAGEMENT['recruitmentList'].fn({ cursorGroupId: pageParam }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      return lastPage._meta.nextCursor;
    },
  });

  return { data, fetchNextPage, hasNextPage, error, isFetching };
};

export default useRecruitmentListInfiniteQuery;
