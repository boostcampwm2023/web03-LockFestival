import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchLogin from '@apis/fetchLogin';
import { useSetRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import fetchUserProfile from '@apis/fetchUserProfile';
import { toast } from 'react-toastify';

const Auth = () => {
  const navigate = useNavigate();
  const setProfile = useSetRecoilState(userAtom);
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  const handleLogin = async () => {
    try {
      const { token } = await fetchLogin(code as string);

      localStorage.setItem('accessToken', token);

      await new Promise((resolve) => setTimeout(resolve, 100));

      // 프로필 api
      const res = await fetchUserProfile();
      setProfile(res);

      navigate(localStorage.getItem('lastVisited') || '/');
    } catch (error) {
      toast.error('서버 에러 발생!!');
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <div>네이버 로그인 중...</div>;
};

export default Auth;
