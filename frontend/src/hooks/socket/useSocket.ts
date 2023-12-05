import { useState, useEffect } from 'react';
import { ServerChatLog, ServerChatLogList } from 'types/chat';
import useSocketConnection from './useSocketConnection';
import useChatLog from './useChatLog';

const useSocket = (roomId: string) => {
  const { socket, connecting } = useSocketConnection(roomId);

  const [receiveChat, setReceiveChat] = useState<ServerChatLog | null>(null);

  const [receivePastChat, setReceivePastChat] = useState<ServerChatLogList | null>(null);

  const { addPresentChat, addPastChats, addFutureChats } = useChatLog(roomId);

  const sendChat = (message: string) => {
    socket?.emit('chat', { message });
  };

  const getPastChat = (cursorId: string) => {
    socket?.emit('chatLog', {
      cursorLogId: cursorId,
      count: 50,
      directrion: -1,
    });
  };

  useEffect(() => {
    if (socket) {
      socket.on('chat', (res: ServerChatLog) => {
        const { message, userId, type, time, chatId } = res;
        setReceiveChat({ message, userId, type, time, chatId });
      });

      socket.on('chatLog', (res: ServerChatLogList) => {
        setReceivePastChat(res);
      });
    }
  }, [socket]);

  useEffect(() => {
    addPresentChat(receiveChat);
  }, [receiveChat]);

  useEffect(() => {
    if (!receivePastChat) {
      return;
    }

    if (receivePastChat.direction === 1) {
      addFutureChats(receivePastChat);
      return;
    }
    addPastChats(receivePastChat);
  }, [receivePastChat]);

  return { sendChat, connecting, getPastChat };
};

export default useSocket;
