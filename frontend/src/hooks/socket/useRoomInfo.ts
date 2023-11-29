import { useState } from 'react';
import { RoomInfo } from 'types/chat';

const useRoomInfo = () => {
  const [roomInfo, setRoomInfo] = useState<RoomInfo>();

  return { roomInfo, setRoomInfo };
};

export default useRoomInfo;
