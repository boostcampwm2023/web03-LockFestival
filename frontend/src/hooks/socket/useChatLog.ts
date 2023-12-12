import { ChatLog, ServerChatLog, ServerChatLogList } from 'types/chat';
import { useRecoilState } from 'recoil';
import { chatLogAtom } from '@store/chatRoom';
import { chatLogDataTransformer } from '@utils/chatDataUtils';

const useChatLog = (roomId: string) => {
  const [chatLog, setChatLog] = useRecoilState(chatLogAtom(roomId));

  const addPresentChat = (receiveChat: ServerChatLog | null) => {
    const currentRoomChatting = new Map<string, ChatLog>(chatLog);

    if (receiveChat) {
      const { chatId, message, userId, type, time } = receiveChat;

      currentRoomChatting.set(chatId, {
        message,
        userId,
        type,
        time,
      });
      setChatLog(currentRoomChatting);
    }
  };

  const addPastChats = (receiveChat: ServerChatLogList) => {
    const receiveChatMap = chatLogDataTransformer(receiveChat.messages);

    const newMap: Map<string, ChatLog> = chatLog
      ? new Map([...receiveChatMap, ...chatLog])
      : new Map([...receiveChatMap]);

    setChatLog(newMap);
  };

  const addFutureChats = (receiveChat: ServerChatLogList) => {
    const receiveChatMap = chatLogDataTransformer(receiveChat.messages);

    const newMap: Map<string, ChatLog> = chatLog
      ? new Map([...chatLog, ...receiveChatMap])
      : new Map([...receiveChatMap]);

    setChatLog(newMap);
  };

  return { addPresentChat, addPastChats, addFutureChats };
};

export default useChatLog;
