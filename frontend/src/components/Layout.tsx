import tw, { styled, css } from 'twin.macro';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import Modals from './Modals/Modals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Modals />
        <Outlet />
        <CustomToastContainer theme="dark" position="bottom-center" autoClose={3000} />
      </Main>
    </Container>
  );
};

const Container = styled.div([tw`bg-gray-dark h-auto w-full min-h-screen mobile:(min-w-[34rem])`]);

const Main = styled.main([]);

const CustomToastContainer = styled(ToastContainer)([
  css`
    .Toastify__toast {
      font-family: 'MaplestoryOTFLight';
      font-size: 1.6rem;
    }
  `,
]);

export default Layout;
