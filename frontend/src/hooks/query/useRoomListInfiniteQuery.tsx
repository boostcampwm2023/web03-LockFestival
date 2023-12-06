import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useInfiniteQuery } from '@tanstack/react-query';

const useRoomListInfiniteQuery = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: [QUERY_MANAGEMENT['roomList'].key],
    queryFn: ({ pageParam }) => QUERY_MANAGEMENT['roomList'].fn({ cursorGroupId: pageParam }),
    initialPageParam: -1,
    getNextPageParam: (lastPage) => {
      return lastPage._meta.nextCursor;
    },
  });

  return { data, fetchNextPage, hasNextPage, error, isFetching };
};

export default useRoomListInfiniteQuery;
