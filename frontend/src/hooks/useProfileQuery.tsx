import { SERVER_URL } from '@config/server';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Profile } from 'types/profile';

const fetchUserProfile = async () => {
  //TODO: axios 인스턴스 생성 후 리팩토링

  return (await axios({ method: 'get', url: SERVER_URL + '/users/profile' })).data;
};

const useProfileQuery = () => {
  const { data, isSuccess, isLoading, isError } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: fetchUserProfile,
    staleTime: 3600,
  });

  return { data, isSuccess, isLoading, isError };
};

export default useProfileQuery;
