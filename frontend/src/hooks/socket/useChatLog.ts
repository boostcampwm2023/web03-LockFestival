import { ChatLog, ServerChatLog, TotalChatLog } from 'types/chat';
import { useRecoilState } from 'recoil';
import { chatLogAtom } from '@store/chatRoom';
import { useEffect } from 'react';

const useChatLog = (roomId: string, receiveChat: ServerChatLog | null) => {
  const [chatLog, setChatLog] = useRecoilState<TotalChatLog>(chatLogAtom);

  useEffect(() => {
    const currentRoomChatting = new Map<string, ChatLog>(chatLog[roomId]);

    if (receiveChat) {
      const { chatId, message, userId, type, time } = receiveChat;

      currentRoomChatting.set(chatId, {
        message,
        userId,
        type,
        time,
      });
      setChatLog((prev) => ({ ...prev, [roomId]: currentRoomChatting }));
    }
  }, [receiveChat]);
};

export default useChatLog;
