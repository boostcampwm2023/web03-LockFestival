import { useEffect, useState } from 'react';
import { SERVER_URL } from '@config/server';
import axios from 'axios';

declare global {
  interface Window {
    naver: any;
  }
}

function NaverLogin() {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const NAVER_CALLBACK_URL = import.meta.env.VITE_NAVER_REDIRECT_URI;

  const { naver } = window;
  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: NAVER_CALLBACK_URL,
    isPopup: false,
    loginButton: { color: 'green', type: 3, height: 36 },
    callbackHandle: false,
  });

  useEffect(() => {
    naverLogin.init();
  }, []);

  return (
    <>
      <div>
        <div id="naverIdLogin"></div>
      </div>
    </>
  );
}

export default NaverLogin;
