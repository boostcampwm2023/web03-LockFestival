import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@config/server';
import { chatUnreadAtom, roomInfoAtom, userListInfoAtom } from '@store/chatRoom';
import { useSetRecoilState } from 'recoil';
import { userDataTransformer } from '@utils/chatDataUtils';
import SocketEvent from 'types/socketEvent';

const useSocketConnection = (roomId: string) => {
  const accessToken = localStorage.getItem('accessToken');

  const [connecting, setConnecting] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

  const setRoomInfo = useSetRecoilState(roomInfoAtom);
  const setUserListInfo = useSetRecoilState(userListInfoAtom);
  const setChatUnread = useSetRecoilState(chatUnreadAtom);

  const waitForEvent = (eventName: keyof SocketEvent) => {
    return new Promise((resolve) => {
      socket?.on(eventName, (data) => {
        if (eventName === 'roomInfo') {
          setRoomInfo(data);
          resolve(data);
        }
        if (eventName === 'userListInfo') {
          setUserListInfo(userDataTransformer(data));
          resolve(data);
        }
      });
    });
  };

  const handleConnect = async () => {
    try {
      socket?.emit(
        'join',
        {
          roomId,
          Authorization: `${accessToken}`,
        },
        (res: any) => {
          if (res === 'ok') {
            // console.log('방에 접속 성공');
          }
        }
      );

      await Promise.all([waitForEvent('roomInfo'), waitForEvent('userListInfo')]);
      setConnecting(false);
    } catch (error) {
      console.error(error);
    }

    socket?.on('error', (err) => {
      console.log(err, '에러발생');
      socket?.disconnect();
    });
  };

  useEffect(() => {
    const disSocket = io(`${SOCKET_URL}`, {
      reconnectionDelayMax: 10000,
    });

    setSocket(disSocket);

    return () => {
      disSocket.disconnect();
      setRoomInfo(undefined);
      setUserListInfo(undefined);
      setChatUnread(new Map());
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('connect', handleConnect);
    }
  }, [socket]);

  return { socket, connecting };
};

export default useSocketConnection;
