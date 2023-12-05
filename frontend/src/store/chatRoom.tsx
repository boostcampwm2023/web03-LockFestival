import { atom } from 'recoil';
import { ChatLog, RoomInfo, UserInfoObject } from 'types/chat';

export const chatLogAtom = atom<Record<string, Map<string, ChatLog>>>({
  key: 'chatLogAtom',
  default: {},
});

export const roomInfoAtom = atom<RoomInfo | undefined>({
  key: 'roomInfoAtom',
  default: undefined,
});

export const userListInfoAtom = atom<UserInfoObject | undefined>({
  key: 'userListInfoAtom',
  default: undefined,
});

export const chatUnreadAtom = atom<Map<string, string>>({
  key: 'chatUnreadAtom',
  default: new Map(),
});
