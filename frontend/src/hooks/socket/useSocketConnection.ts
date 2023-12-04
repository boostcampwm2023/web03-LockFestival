import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@config/server';
import { chatLogAtom, cursorLogIdAtom, roomInfoAtom, userListInfoAtom } from '@store/chatRoom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userDataTransformer, chatLogDataTransformer } from '@utils/chatDataUtils';
import SocketEvent from 'types/socketEvent';

const useSocketConnection = (roomId: string) => {
  const [connecting, setConnecting] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const accessToken = localStorage.getItem('accessToken');
  const setRoomInfo = useSetRecoilState(roomInfoAtom);
  const setUserListInfo = useSetRecoilState(userListInfoAtom);
  const setCursorLogId = useSetRecoilState(cursorLogIdAtom);
  const [chatLog, setChatLog] = useRecoilState(chatLogAtom);

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

        if (eventName === 'chatLog') {
          console.log(data);

          localStorage.setItem('last', data.messages[0].chatId);

          setCursorLogId(data.messages[0].chatId);

          const tmpMessage = chatLogDataTransformer(data.messages);

          let changeMap: any;

          if (data.direction === 1) {
            changeMap = chatLog[roomId]
              ? new Map([...chatLog[roomId], ...tmpMessage])
              : new Map([...tmpMessage]);
            console.log(roomId, chatLog, chatLog[roomId], tmpMessage);
          } else {
            changeMap = new Map([...tmpMessage]);

            changeMap = chatLog[roomId]
              ? new Map([...tmpMessage, ...chatLog[roomId]])
              : new Map([...tmpMessage]);
            console.log(roomId, chatLog, chatLog[roomId], tmpMessage);
          }
          console.log(changeMap);
          setChatLog((prev) => ({
            ...prev,
            [roomId]: new Map([...changeMap]),
          }));
          resolve(data);
        }
      });
    });
  };

  useEffect(() => {
    console.log(chatLog);
  }, [chatLog]);

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
            console.log('방에 접속 성공');
          }
        }
      );

      await Promise.all([
        waitForEvent('roomInfo'),
        waitForEvent('userListInfo'),
        waitForEvent('chatLog'),
      ]);

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
      setChatLog({});
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
