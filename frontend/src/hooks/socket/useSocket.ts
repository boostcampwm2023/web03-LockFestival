import { useState, useEffect } from 'react';
import { ServerChatLog } from 'types/chat';
import useSocketConnection from './useSocketConnection';
import useChatLog from './useChatLog';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chatLogAtom, cursorLogIdAtom } from '@store/chatRoom';
import { chatLogDataTransformer } from '@utils/chatDataUtils';

const useSocket = (roomId: string) => {
  const { socket, connecting } = useSocketConnection(roomId);
  const [receiveChat, setReceiveChat] = useState<ServerChatLog | null>(null);
  const [chatLog, setChatLog] = useRecoilState(chatLogAtom);
  const [cursorLogId, setCursorLogId] = useRecoilState(cursorLogIdAtom);
  useChatLog(roomId, receiveChat);

  useEffect(() => {
    if (socket) {
      socket.on('chat', (res: ServerChatLog) => {
        const { message, userId, type, time, chatId } = res;
        setReceiveChat({ message, userId, type, time, chatId });
      });

      // socket?.on('chatLog', (data: any) => {
      //   setCursorLogId(data.messages[0].chatId);

      //   localStorage.setItem('last', data.messages[0].chatId);

      //   const tmpMessage = chatLogDataTransformer(data.messages);

      //   let changeMap: any;

      //   console.log(chatLog[roomId]);

      //   if (data.direction === 1) {
      //     changeMap = chatLog[roomId]
      //       ? new Map([...chatLog[roomId], ...tmpMessage])
      //       : new Map([...tmpMessage]);
      //   } else {
      //     changeMap = chatLog[roomId]
      //       ? new Map([...tmpMessage, ...chatLog[roomId]])
      //       : new Map([...tmpMessage]);
      //   }

      //   setChatLog((prev) => ({ ...prev, [roomId]: changeMap }));
      // });
    }
  }, [socket]);

  const sendChat = (message: string) => {
    socket?.emit('chat', { message }, (res: any) => {});
  };

  const getPastChat = () => {
    const a = localStorage.getItem('last');

    socket?.emit('chatLog', { cursorLogId: a, count: 50, direction: -1 }, (data: any) => {
      console.log('emit할때', a);
    });
  };

  return { sendChat, connecting, getPastChat };
};

export default useSocket;
