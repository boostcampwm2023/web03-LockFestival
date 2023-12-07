import deleteGroupByGroupId from '@apis/deleteGroupByGroupId';

const MUTATION_MANAGEMENT = {
  leaveRoom: {
    key: 'leaveRoom',
    fn: (groudId: number) => deleteGroupByGroupId(groudId),
  },
};

export default MUTATION_MANAGEMENT;
