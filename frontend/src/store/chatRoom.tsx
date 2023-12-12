import { atom, atomFamily } from 'recoil';
import { ChatLog, RoomInfo, UserInfoObject } from 'types/chat';

export const chatLogAtom = atomFamily<Map<string, ChatLog>, string>({
  key: 'chatLogAtom',
  default: new Map(),
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
