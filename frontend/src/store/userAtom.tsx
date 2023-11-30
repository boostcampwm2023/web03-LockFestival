import { atom } from 'recoil';
import { Profile } from 'types/profile';

const userAtom = atom<Profile>({
  key: 'userAtom',
  default: { nickname: '', profileImageUrl: null, isMoreInfo: false },
});

export default userAtom;
