import { atom } from 'recoil';
import { ChatLog } from 'types/chat';

export const chatLogAtom = atom<Record<string, Map<string, ChatLog>>>({
  key: 'chatLogAtom',
  default: {},
});
