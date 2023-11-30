import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useSuspenseQuery } from '@tanstack/react-query';

const useRoomListQuery = () => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_MANAGEMENT['roomList'].key],
    queryFn: QUERY_MANAGEMENT['roomList'].fn,
    retry: false,
  });

  return { data };
};

export default useRoomListQuery;
