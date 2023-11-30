import { atom } from 'recoil';

const isSwipingAtom = atom<boolean>({
  key: 'isSwipingAtom',
  default: false,
});

export default isSwipingAtom;
