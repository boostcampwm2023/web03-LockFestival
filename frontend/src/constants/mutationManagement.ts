import deleteGroupByGroupId from '@apis/deleteGroupByGroupId';
import fetchJoin from '@apis/fetchJoin';
import { JoinData } from 'types/profile';

const MUTATION_MANAGEMENT = {
  leaveRoom: {
    key: 'leaveRoom',
    fn: (groudId: number) => deleteGroupByGroupId(groudId),
  },
  changeProfile: {
    key: 'changeProfile',
    fn: (userData: JoinData | undefined) => fetchJoin(userData),
  },
};

export default MUTATION_MANAGEMENT;
