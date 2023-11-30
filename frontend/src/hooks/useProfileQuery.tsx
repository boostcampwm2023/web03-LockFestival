import { useQuery } from '@tanstack/react-query';
import { Profile } from 'types/profile';
import QUERY_MANAGEMENT from '@constants/queryManagement';

const useProfileQuery = () => {
  const { data, isSuccess, isLoading, isError, refetch } = useQuery<Profile>({
    queryKey: [QUERY_MANAGEMENT['profile'].key],
    queryFn: QUERY_MANAGEMENT['profile'].fn,
    enabled: localStorage.getItem('accessToken') ? true : false,
  });

  return { data, isSuccess, isLoading, isError, refetch };
};

export default useProfileQuery;
