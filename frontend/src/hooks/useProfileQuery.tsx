import { useQuery } from '@tanstack/react-query';
import { Profile } from 'types/profile';
import userInstance from '@config/userInstance';

const fetchUserProfile = async () => {
  return (await userInstance({ method: 'get', url: '/users/profile' })).data;
};

const useProfileQuery = () => {
  const { data, isSuccess, isLoading, isError, refetch } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
  });

  return { data, isSuccess, isLoading, isError, refetch };
};

export default useProfileQuery;
