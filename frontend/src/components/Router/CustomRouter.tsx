import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';

import Diary from '@pages/Diary/Diary';
import Recruitment from '@pages/Recruitment/Recruitment';
import Auth from '@pages/Auth/Auth';
import MyPage from '@pages/Mypage/Mypage';
import Root from '@pages/Root/Root';
import Search from '@pages/Search/Search';
import Chat from '@pages/Chat/Chat';
import GroupList from '@pages/GroupList/GroupList';


const CustomRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Root />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/recruitment" element={<Recruitment />}></Route>
          <Route path="/diary" element={<Diary />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/chat-room/:roomId" element={<Chat />}></Route>
          <Route path="/group-list" element={<GroupList />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
