import { userListInfoAtom } from '@store/chatRoom';
import userAtom from '@store/userAtom';
import { ReactElement, ReactNode } from 'react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfoObject } from 'types/chat';

const HostIdentification = ({ children }: { children: ReactNode }) => {
  const userListInfo = useRecoilValue(userListInfoAtom) as UserInfoObject;
  const userNickName = useRecoilValue(userAtom).nickname;
  const settingMode =
    Array.from(userListInfo.entries()).filter(([_, value]) => {
      return value.nickname === userNickName && value.isLeader;
    }).length > 0;

  return <>{React.cloneElement(children as ReactElement, { settingMode })}</>;
};

export default HostIdentification;
