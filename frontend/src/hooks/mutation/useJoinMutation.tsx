import MUTATION_MANAGEMENT from '@constants/mutationManagement';
import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { JoinData } from 'types/profile';

const useJoinMutation = (joinData: JoinData | undefined) => {
  const queryClient = useQueryClient();

  const { data, mutate, status } = useMutation({
    mutationKey: [MUTATION_MANAGEMENT['changeProfile'].key, joinData],
    mutationFn: () => MUTATION_MANAGEMENT['changeProfile'].fn(joinData),
    onSuccess: (data) => {
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);
      queryClient.invalidateQueries({ queryKey: [QUERY_MANAGEMENT['profile'].key] });
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    },
  });

  return { data, mutate, status };
};

export default useJoinMutation;
