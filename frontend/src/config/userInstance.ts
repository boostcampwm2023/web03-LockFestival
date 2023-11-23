import { SERVER_URL } from './server';
import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const userInstance = axios.create({
  baseURL: SERVER_URL,
  timeout: 1000,
});

const NOT_FOUND = 404;
const UNAUTHORIZED_ERROR_CODE = 401;

userInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem('accessToken');

    //TODO: accessToeken이 만료됐는지 체크, 완료됐으면 refreshToken도 같이 전달하는 로직 추가

    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

userInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    switch (response.status) {
      case NOT_FOUND:
        console.log('404 에러 발생!');
        break;
      case UNAUTHORIZED_ERROR_CODE:
        console.log('unauthorized error 발생');
        break;
      default:
        break;
    }

    return response;
  },
  (error) => Promise.reject(error)
);

export default userInstance;
