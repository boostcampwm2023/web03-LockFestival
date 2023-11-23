import axios from 'axios';

import { SERVER_URL } from '@config/server';

//TODO: 추후 리프레시 토큰과 액세스 토큰으로 세분화
interface LoginData {
  token: string;
}

const fetchLogin = async (code: string) => {
  //TODO: axios 인스턴스 개발 후 리팩토링

  return (
    await axios<LoginData>({
      method: 'get',
      url: SERVER_URL + `/auth/login/naver?code=${code}`,
    })
  ).data;
};

export default fetchLogin;
