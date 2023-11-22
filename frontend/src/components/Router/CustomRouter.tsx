import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';

import Diary from '@pages/Diary/Diary';
import GroupChat from '@pages/GroupChat/GroupChat';
import Recruitment from '@pages/Recruitment/Recruitment';
import Auth from '@pages/auth/Auth';
import Root from '@pages/root/Root';
import MyPage from '@pages/mypage/Mypage';

const CustomRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Root />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/recruitment" element={<Recruitment />}></Route>
          <Route path="/group-chat" element={<GroupChat />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
