import tw, { styled, css } from 'twin.macro';
import Room from './Room/Room';
import { useRef } from 'react';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useRoomListInfiniteQuery from '@hooks/query/useRoomListInfiniteQuery';

const RoomListLayout = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetching } = useRoomListInfiniteQuery();

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  return (
    <Container>
      {data?.pages.map((page) => {
        return page.data.map((room) => {
          return <Room {...room} key={room.groupId} />;
        });
      })}
      <div ref={targetRef}></div>
      {isFetching && <TextContainer>그룹 채팅방 목록을 불러오는 중...</TextContainer>}
      {data && !hasNextPage && <TextContainer>마지막 채팅방입니다!</TextContainer>}
    </Container>
  );
};

const Container = styled.div([
  tw`w-full mx-auto py-[2rem]`,
  tw`desktop:(max-w-[102.4rem])`,
  css`
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  `,
]);

const TextContainer = styled.div([
  tw`w-full mx-auto text-white text-l pt-4 max-w-[102.4rem] border-t border-white border-solid`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

export default RoomListLayout;
