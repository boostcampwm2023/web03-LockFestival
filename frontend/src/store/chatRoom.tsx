import { atom } from 'recoil';
import { ChatLog } from 'types/chat';
import mockChatLogData from '../pages/Chat/mock/mockChatLogData';

export const chatLog = atom<ChatLog[]>({
  key: 'chatLog',
  default: mockChatLogData,
});
