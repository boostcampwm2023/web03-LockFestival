import userInstance from '@config/userInstance';

const fetchEnterRoom = async (groupId: number) => {
  return (await userInstance({ method: 'post', url: `/groups/${groupId}/enter`, timeout: 5000 }))
    .data;
};

export default fetchEnterRoom;
