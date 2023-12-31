import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '@components/Layout';

import Diary from '@pages/Diary/Diary';
import Recruitment from '@pages/Recruitment/Recruitment';
import Auth from '@pages/Auth/Auth';
import MyPage from '@pages/Mypage/Mypage';
import Root from '@pages/Root/Root';
import Search from '@pages/Search/Search';
import ChatRoom from '@pages/ChatRoom/ChatRoom';
import RoomList from '@pages/RoomList/RoomList';
import Error404 from '@pages/Error/Error404';

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
          <Route path="/chat-room/:roomId" element={<ChatRoom />}></Route>
          <Route path="/room-list" element={<RoomList />}></Route>
          <Route path="/*" element={<Error404 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRouter;
