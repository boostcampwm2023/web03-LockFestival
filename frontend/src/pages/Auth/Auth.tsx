import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchLogin from '@apis/fetchLogin';
import { useSetRecoilState } from 'recoil';
import userAtom from 'store/userAtom';
import { toast } from 'react-toastify';
import fetchFirstUserProfile from '@apis/fetchFirstUserProfile';

const Auth = () => {
  const navigate = useNavigate();
  const setProfile = useSetRecoilState(userAtom);
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  const handleLogin = async () => {
    try {
      const { token } = await fetchLogin(code as string);

      localStorage.setItem('accessToken', token);

      // 프로필 api
      const res = await fetchFirstUserProfile(token);
      setProfile(res);

      navigate(localStorage.getItem('lastVisited') || '/', {
        replace: true,
      });
    } catch (error) {
      toast.error('서버 에러 발생!!');
    }
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return <div></div>;
};

export default Auth;
