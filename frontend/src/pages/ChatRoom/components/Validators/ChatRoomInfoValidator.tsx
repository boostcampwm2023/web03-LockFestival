import { ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import { userListInfoAtom, roomInfoAtom } from '@store/chatRoom';

const ChatRoomInfoValidator = ({ children }: { children: ReactNode }) => {
  const userListInfo = useRecoilValue(userListInfoAtom);
  const roomInfo = useRecoilValue(roomInfoAtom);

  if (!userListInfo) {
    throw new Error('유저 정보가 없습니다.');
  }

  if (!roomInfo) {
    throw new Error('방 정보가 없습니다.');
  }

  return children;
};

export default ChatRoomInfoValidator;
