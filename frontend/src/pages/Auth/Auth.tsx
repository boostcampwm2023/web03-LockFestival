import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import fetchLogin from '@apis/fetchLogin';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  const handleLogin = async () => {
    try {
      const { token } = await fetchLogin(code as string);
      localStorage.setItem('accessToken', token);

      // 마지막 방문 페이지로 이동
      const lastVisited = localStorage.getItem('lastVisited') || '/';
      navigate(lastVisited);
    } catch (error) {
      alert('서버 에러 발생!!');
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <div>네이버 로그인 중...</div>;
};

export default Auth;
