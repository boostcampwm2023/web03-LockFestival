import tw, { css, styled } from 'twin.macro';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
import Modals from './Modals/Modals';

const Layout = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Modals />
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div([tw`bg-gray-dark h-auto w-full min-h-screen mobile:(min-w-[34rem])`]);

const Main = styled.main([]);

export default Layout;
