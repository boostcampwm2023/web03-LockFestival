import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';

import Diary from '@pages/Diary/Diary';
import GroupChat from '@pages/GroupChat/GroupChat';
import Recruitment from '@pages/Recruitment/Recruitment';
import Auth from '@pages/Auth/Auth';
import MyPage from '@pages/Mypage/Mypage';
import Root from '@pages/Root/Root';
import Search from '@pages/Search/search';

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
          <Route path="/search" element={<Search />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
