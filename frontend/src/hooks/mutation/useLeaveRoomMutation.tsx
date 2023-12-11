import MUTATION_MANAGEMENT from '@constants/mutationManagement';
import QUERY_MANAGEMENT from '@constants/queryManagement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useLeaveRoomMutation = (groupId: number) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, mutate, status } = useMutation({
    mutationKey: [MUTATION_MANAGEMENT['leaveRoom'].key, groupId],
    mutationFn: (groupId: number) => MUTATION_MANAGEMENT['leaveRoom'].fn(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_MANAGEMENT['roomList'].key] });
      toast.success('방을 나왔습니다!');
      navigate('/room-list');
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });

  return { data, mutate, status };
};

export default useLeaveRoomMutation;
