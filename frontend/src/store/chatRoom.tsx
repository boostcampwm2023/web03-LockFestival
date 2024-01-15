import { DefaultValue, atom, atomFamily, selectorFamily } from 'recoil';
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

const mobileMenuState = atom<Record<string, boolean | DefaultValue>>({
  key: 'mobileMenuState',
  default: { mobileMenuClicked: false, userListMenuSelected: false, roomInfoMenuSelected: false },
});

export const mobileMenuSelector = selectorFamily({
  key: 'mobileMenuSelector',
  get:
    (menuName: 'mobileMenuClicked' | 'userListMenuSelected' | 'roomInfoMenuSelected') =>
    ({ get }) =>
      get(mobileMenuState)[menuName],
  set:
    (menuName: 'mobileMenuClicked' | 'userListMenuSelected' | 'roomInfoMenuSelected') =>
    ({ set }, val) =>
      set(mobileMenuState, (prevState) => ({
        ...prevState,
        [menuName]: val,
      })),
});
