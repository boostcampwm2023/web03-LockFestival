import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

const useRecruitmentListInfiniteQuery = () => {
  const [searchParams] = useSearchParams();
  const themeName = searchParams.get('themeName') || '';
  const smallRegion = searchParams.get('smallRegion') || '';
  const bigRegion = searchParams.get('bigRegion') || '';

  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [QUERY_MANAGEMENT['recruitmentList'].key, themeName + bigRegion + smallRegion],
    queryFn: ({ pageParam }) =>
      QUERY_MANAGEMENT['recruitmentList'].fn({
        cursorGroupId: pageParam,
        themeName,
        smallRegion,
        bigRegion,
      }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      return lastPage._meta.nextCursor;
    },
  });

  return { data, fetchNextPage, hasNextPage, error, isFetching };
};

export default useRecruitmentListInfiniteQuery;
