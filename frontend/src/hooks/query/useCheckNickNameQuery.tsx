import { useQuery } from '@tanstack/react-query';
import QUERY_MANAGEMENT from '@constants/queryManagement';

const useCheckNickNameQuery = (input: string) => {
  const { data, isSuccess, isError, refetch } = useQuery<boolean>({
    queryKey: [QUERY_MANAGEMENT['isValidNickName'].key, input],
    queryFn: () => QUERY_MANAGEMENT['isValidNickName'].fn(input),
    enabled: false,
  });

  return { data, isSuccess, isError, refetch };
};

export default useCheckNickNameQuery;
