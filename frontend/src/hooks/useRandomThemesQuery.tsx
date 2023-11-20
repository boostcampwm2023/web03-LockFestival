import { useQuery } from '@tanstack/react-query';
import QUERY_MANAGEMENT from '@constants/queryManagement';

const useRandomThemesQuery = () => {
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: [QUERY_MANAGEMENT['randomThemes'].key],
    queryFn: QUERY_MANAGEMENT['randomThemes'].fn,
  });

  return { data, isSuccess, isError, isLoading };
};

export default useRandomThemesQuery;
