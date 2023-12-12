import { SERVER_URL } from '@config/server';
import axios from 'axios';

const fetchFirstUserProfile = async (token: string) => {
  const res = (
    await axios({
      method: 'get',
      url: SERVER_URL + '/users/profile',
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

  return res;
};

export default fetchFirstUserProfile;
