import { SERVER_URL } from '@config/server';
import axios from 'axios';
import { Profile } from 'types/profile';

const fetchFirstUserProfile = async (token: string) => {
  const res = (
    await axios<Profile>({
      method: 'get',
      url: SERVER_URL + '/users/profile',
      headers: { Authorization: `Bearer ${token}` },
    })
  ).data;

  return res;
};

export default fetchFirstUserProfile;
