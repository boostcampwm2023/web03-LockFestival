import axios from 'axios';
import { SERVER_URL } from '@config/server';
import { useEffect } from 'react';

function AuthHandler() {
  const getUser = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    const loginAPI = axios({
      method: 'get',
      url: SERVER_URL + `/auth/login/naver?code=${token}`,
    });
    try {
      const response = await loginAPI;
      console.log(response);
      window.history.back();
    } catch (error) {
      // Handle the error as needed
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <>hello</>;
}

export default AuthHandler;
