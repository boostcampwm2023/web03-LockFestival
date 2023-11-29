import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@config/server';
import { RoomInfo, UserInfo } from 'types/chat';
import useRoomInfo from './useRoomInfo';
import useUserListInfo from './useUserInfo';
import { useRecoilState } from 'recoil';
import { ServerChatLog, TotalChatLog, ChatLog } from 'types/chat';
import { chatLogAtom } from 'store/chatRoom';

//TODO: useSocket 분리하기
const useSocket = (roomId: string) => {
  const accessToken = localStorage.getItem('accessToken');
  const [chatLog, setChatLog] = useRecoilState<TotalChatLog>(chatLogAtom);

  const [receiveChat, setReceiveChat] = useState<ServerChatLog>();

  const { roomInfo, setRoomInfo } = useRoomInfo();
  const { userListInfo, setUserListInfo } = useUserListInfo();

  const [socket, setSocket] = useState<Socket>();

  const sendChat = (message: string) => {
    socket?.emit('chat', { message }, (res: any) => {});
  };

  const connectSocket = () => {
    socket?.on('connect', () => {
      joinRoom();
    });
  };

  const joinRoom = () => {
    socket?.emit(
      'join',
      {
        roomId,
        Authorization: `${accessToken}`,
      },
      (res: any) => {
        if (res === 'ok') {
          console.log('방에 접속 성공');
        }
      }
    );

    socket?.on('roomInfo', (res: RoomInfo) => {
      setRoomInfo(res);
    });

    socket?.on('userListInfo', (res: UserInfo[]) => {
      setUserListInfo(res);
    });

    //TODO: 에러 처리하기
    socket?.on('error', (err) => {
      console.log(err, '에러발생');
      socket?.disconnect();
    });

    socket?.on('chat', (res: ServerChatLog) => {
      const { message, userId, type, time, logId } = res;
      setReceiveChat({ message, userId, type, time, logId });
    });
  };

  useEffect(() => {
    const currentRoomChatting = new Map<string, ChatLog>(chatLog[roomId]);

    if (receiveChat) {
      const { logId, message, userId, type, time } = receiveChat;

      currentRoomChatting.set(logId, {
        message,
        userId,
        type,
        time,
      });

      setChatLog((prev) => ({ ...prev, [roomId]: currentRoomChatting }));
    }
  }, [receiveChat]);

  useEffect(() => {
    connectSocket();
  }, [socket]);

  useEffect(() => {
    const disposableSocket = io(`${SOCKET_URL}`, {
      reconnectionDelayMax: 10000,
    });
    setSocket(disposableSocket);
  }, []);

  return { roomInfo, userListInfo, sendChat };
};

export default useSocket;
