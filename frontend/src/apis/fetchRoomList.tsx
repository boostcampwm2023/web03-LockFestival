import userInstance from '@config/userInstance';
import { GroupProps } from 'types/group';

const fetchRoomList = async () => {
  return (await userInstance<Array<GroupProps>>({ method: 'get', url: '/users/rooms' })).data;
};

export default fetchRoomList;
