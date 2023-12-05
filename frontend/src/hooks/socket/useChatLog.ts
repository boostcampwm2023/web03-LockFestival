import { ChatLog, ServerChatLog, ServerChatLogList, TotalChatLog } from 'types/chat';
import { useRecoilState } from 'recoil';
import { chatLogAtom } from '@store/chatRoom';
import { chatLogDataTransformer } from '@utils/chatDataUtils';

const useChatLog = (roomId: string) => {
  const [chatLog, setChatLog] = useRecoilState(chatLogAtom);

  const addPresentChat = (receiveChat: ServerChatLog | null) => {
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
  };

  const addPastChats = (receiveChat: ServerChatLogList) => {
    const receiveChatMap = chatLogDataTransformer(receiveChat.messages);

    const newMap: Map<string, ChatLog> = chatLog[roomId]
      ? new Map([...receiveChatMap, ...chatLog[roomId]])
      : new Map([...receiveChatMap]);

    setChatLog((prev) => ({
      ...prev,
      [roomId]: new Map([...newMap]),
    }));
  };

  const addFutureChats = (receiveChat: ServerChatLogList) => {
    const receiveChatMap = chatLogDataTransformer(receiveChat.messages);

    const newMap: Map<string, ChatLog> = chatLog[roomId]
      ? new Map([...chatLog[roomId], ...receiveChatMap])
      : new Map([...receiveChatMap]);

    setChatLog((prev) => ({
      ...prev,
      [roomId]: new Map([...newMap]),
    }));
  };

  return { addPresentChat, addPastChats, addFutureChats };
};

export default useChatLog;
