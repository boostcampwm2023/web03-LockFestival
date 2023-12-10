import { useState, useEffect, useCallback } from 'react';
import { ChangeRoomData, ServerChatLog, ServerChatLogList } from 'types/chat';
import useSocketConnection from './useSocketConnection';
import useChatLog from './useChatLog';
import { useSetRecoilState } from 'recoil';
import { chatUnreadAtom } from '@store/chatRoom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSocket = (roomId: string) => {
  const { socket, connecting } = useSocketConnection(roomId);

  const [receiveChat, setReceiveChat] = useState<ServerChatLog | null>(null);

  const [receivePastChat, setReceivePastChat] = useState<ServerChatLogList | null>(null);

  const { addPresentChat, addPastChats, addFutureChats } = useChatLog(roomId);

  const setChatUnreadAtom = useSetRecoilState(chatUnreadAtom);

  const navigate = useNavigate();

  const sendChat = useCallback(
    (message: string) => {
      socket?.emit('chat', { message });
    },
    [socket]
  );

  const getPastChat = useCallback(
    (cursorId: string) => {
      socket?.emit('chatLog', {
        cursorLogId: cursorId,
        count: 50,
        directrion: -1,
      });
    },
    [socket]
  );

  const kickUser = useCallback(
    (userId: string) => {
      socket?.emit('kick', {
        userId,
      });
    },
    [socket]
  );

  const changeRoom = useCallback(
    (afterRoomInfo: Record<string, ChangeRoomData>) => {
      socket?.emit('roomInfo', afterRoomInfo);
    },
    [socket]
  );

  useEffect(() => {
    if (socket) {
      socket.on('chat', (res: ServerChatLog) => {
        const { message, userId, type, time, chatId } = res;
        setReceiveChat({ message, userId, type, time, chatId });
      });

      socket.on('chatLog', (res: ServerChatLogList) => {
        setReceivePastChat(res);
      });

      socket.on('unread', (res: Record<string, string>) => {
        setChatUnreadAtom(new Map(Object.entries(res)));
      });

      socket.on('kick', (res) => {
        toast.info('방장에 의해 강퇴당하셨습니다!');
        navigate('/room-list');
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
    if (receivePastChat) {
      addPastChats(receivePastChat);
    }
  }, [receivePastChat]);

  return { sendChat, connecting, getPastChat, kickUser, changeRoom };
};

export default useSocket;
