import tw, { styled, css } from 'twin.macro';
import useRoomListQuery from '@hooks/query/useRoomListQuery';
import Room from './Room/Room';

const RoomListLayout = () => {
  const { data } = useRoomListQuery();

  return (
    <Container>
      {data.map((room) => {
        return <Room {...room} />;
      })}
    </Container>
  );
};

const Container = styled.div([
  tw`w-full mx-auto`,
  tw`desktop:(max-w-[102.4rem])`,
  css`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  `,
]);

export default RoomListLayout;
