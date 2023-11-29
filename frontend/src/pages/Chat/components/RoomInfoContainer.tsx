import tw, { styled, css } from 'twin.macro';

const RoomInfoContainer = () => {
  return <Layout>방정보 보는곳</Layout>;
};

export default RoomInfoContainer;

const Layout = styled.div([
  css`
    width: 34rem;
    height: 100vh;
    padding: 2rem;
  `,
  tw`bg-gray-light rounded-[2rem] h-[calc(90vh - 6rem)]`,
]);
