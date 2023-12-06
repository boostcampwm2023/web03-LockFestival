import MUTATION_MANAGEMENT from '@constants/mutationManagement';
import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

const useLeaveRoomMutation = (groupId: number) => {
  const queryClient = useQueryClient();

  const { data, mutate, status } = useMutation({
    mutationKey: [MUTATION_MANAGEMENT['leaveRoom'].key, groupId],
    mutationFn: (groupId: number) => MUTATION_MANAGEMENT['leaveRoom'].fn(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_MANAGEMENT['roomList'].key] });
      alert('정상적으로 나가셨습니다!');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    },
  });

  return { data, mutate, status };
};

export default useLeaveRoomMutation;
