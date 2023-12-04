import { RoomInfo, UserInfo } from './chat';

interface SocketEvent {
  roomInfo: Promise<RoomInfo>;
  userListInfo: Promise<UserInfo[]>;
  chatLog: Promise<any>;
}

export default SocketEvent;
