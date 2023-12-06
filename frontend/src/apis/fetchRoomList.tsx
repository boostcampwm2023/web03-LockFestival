import userInstance from '@config/userInstance';
import { FetchGroupData } from 'types/group';

interface RoomListFilter {
  cursorGroupId: number | undefined;
  isDesc?: boolean;
  count?: number;
}

const FIRST_CURSOR = -1;

const fetchRoomList = async (queryList: RoomListFilter) => {
  const { cursorGroupId } = queryList;

  queryList.cursorGroupId = cursorGroupId !== FIRST_CURSOR ? cursorGroupId : undefined;

  const queryString = queryList
    ? new URLSearchParams([...Object.entries(queryList)]).toString()
    : '';

  return (await userInstance<FetchGroupData>({ method: 'get', url: `/users/rooms?${queryString}` }))
    .data;
};

export default fetchRoomList;
