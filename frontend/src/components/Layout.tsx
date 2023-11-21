import tw, { styled } from 'twin.macro';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Container = styled.div([tw`bg-gray-dark h-auto w-full min-h-screen`]);

const Main = styled.main([]);

export default Layout;
