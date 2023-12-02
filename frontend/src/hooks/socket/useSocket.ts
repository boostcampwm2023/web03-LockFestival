import { useState, useEffect } from 'react';
import { ServerChatLog } from 'types/chat';
import useSocketConnection from './useSocketConnection';
import useChatLog from './useChatLog';

const useSocket = (roomId: string) => {
  const { socket, connecting } = useSocketConnection(roomId);
  const [receiveChat, setReceiveChat] = useState<ServerChatLog | null>(null);

  useChatLog(roomId, receiveChat);

  useEffect(() => {
    if (socket) {
      socket.on('chat', (res: ServerChatLog) => {
        const { message, userId, type, time, chatId } = res;
        setReceiveChat({ message, userId, type, time, chatId });
      });
    }
  }, [socket]);

  const sendChat = (message: string) => {
    socket?.emit('chat', { message }, (res: any) => {});
  };

  return { sendChat, connecting };
};

export default useSocket;
