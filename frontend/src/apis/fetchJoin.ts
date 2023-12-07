import userInstance from '@config/userInstance';
import { JoinData } from 'types/profile';

const fetchJoin = async (joinData: JoinData | undefined) => {
  return (
    await userInstance({
      method: 'patch',
      url: `/users/user-info`,
      data: joinData,
    })
  ).data;
};

export default fetchJoin;
