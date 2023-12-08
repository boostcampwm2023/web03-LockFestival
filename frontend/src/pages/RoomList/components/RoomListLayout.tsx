import tw, { styled, css } from 'twin.macro';
import Room from './Room/Room';
import { useRef } from 'react';
import useIntersectionObserver from '@hooks/intersectionObserver/useIntersectionObserver';
import useRoomListInfiniteQuery from '@hooks/query/useRoomListInfiniteQuery';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

const RoomListLayout = () => {
  const navigate = useNavigate();

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
      {isFetching && <TextContainer>그룹 채팅방 목록을 불러오는 중...</TextContainer>}
      {data?.pages[0]?.data?.length === 0 && (
        <NotFoundText>
          <div>참여중인 채팅방이 없습니다!</div>
          <br />
          <Button
            isIcon={false}
            font="maplestory"
            size="l-bold"
            onClick={() => navigate('/recruitment')}
          >
            <>참여하러 가기</>
          </Button>
        </NotFoundText>
      )}
      {data?.pages[0]?.data?.length && !hasNextPage && (
        <TextContainer>마지막 채팅방입니다!</TextContainer>
      )}
      <div ref={targetRef}></div>
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

const NotFoundText = styled.div([
  tw`w-full mx-auto text-white text-l pt-4 max-w-[102.4rem] font-pretendard`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  `,
]);

export default RoomListLayout;
