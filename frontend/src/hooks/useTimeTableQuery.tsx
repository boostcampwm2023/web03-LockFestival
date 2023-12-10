import { useQuery } from '@tanstack/react-query';
import QUERY_MANAGEMENT from '@constants/queryManagement';
import { TimeTable } from 'types/chat';
import { Value } from 'react-calendar/dist/cjs/shared/types';

const useTimeTableQuery = (themeId: number, date: Value) => {
  const { data, isSuccess, isLoading, isError } = useQuery<TimeTable[]>({
    queryKey: [QUERY_MANAGEMENT['themeTimeTable'].key, themeId, date],
    queryFn: () => QUERY_MANAGEMENT['themeTimeTable'].fn(themeId, date),
    retryDelay: 5000,
  });

  return { data, isSuccess, isLoading, isError };
};

export default useTimeTableQuery;
