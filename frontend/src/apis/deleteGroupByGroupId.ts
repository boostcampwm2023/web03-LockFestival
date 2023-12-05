import userInstance from '@config/userInstance';

const deleteGroupByGroupId = async (groupId: number) => {
  //TODO: 방 입장 api 및 axios 인스턴스 생성 후 리팩토링
  return (await userInstance({ method: 'delete', url: `/groups/${groupId}` })).data;
};

export default deleteGroupByGroupId;
