import userInstance from '@config/userInstance';

const fetchEnterRoom = async (groupId: number) => {
  return (await userInstance({ method: 'post', url: `/groups/${groupId}/enter` })).data;
};

export default fetchEnterRoom;
