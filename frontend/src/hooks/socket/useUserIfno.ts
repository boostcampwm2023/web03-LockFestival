import { useState } from 'react';
import { UserInfo } from 'types/chat';

const useUserListInfo = () => {
  const [userListInfo, setUserListInfo] = useState<UserInfo[]>();

  return { userListInfo, setUserListInfo };
};

export default useUserListInfo;
