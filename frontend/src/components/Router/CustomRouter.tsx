import Layout from '@components/Layout';

import Root from '@pages/Root/Root';
import Diary from '@pages/Diary/Diary';
import MyPage from '@pages/Mypage/Mypage';
import GroupChat from '@pages/GroupChat/GroupChat';
import Recruitment from '@pages/Recruitment/Recruitment';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const CustomRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Root />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/recruitment" element={<Recruitment />}></Route>
          <Route path="/group-chat" element={<GroupChat />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
