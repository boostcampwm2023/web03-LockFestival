import GroupInfoCard from '@components/Card/GroupInfoCard/GroupInfoCard';
import useRecruitmentListInfiniteQuery from '@hooks/query/useRecruitmentListInfiniteQuery';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useRef } from 'react';
import tw, { css, styled } from 'twin.macro';

const RecruitmentLayout = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetching } = useRecruitmentListInfiniteQuery();

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  return (
    <Container>
      <RecruitList>
        {data?.pages.map((page) => {
          return page.data.map((list) => {
            return <GroupInfoCard {...list} key={list.groupDetail.groupId} />;
          });
        })}
        <div ref={targetRef}></div>
      </RecruitList>
      {isFetching && <TextContainer>모집글을 불러오는중 ...</TextContainer>}
      {!hasNextPage && <TextContainer>마지막 모집글입니다!</TextContainer>}
    </Container>
  );
};

const Container = styled.div([tw`w-full py-[4rem]`]);

const RecruitList = styled.div([
  tw`w-full mx-auto grid-cols-1 w-4/5 py-[2rem]`,
  tw`desktop:(w-[102.4rem] grid-cols-2)`,
  css`
    display: grid;
    justify-content: center;
    align-items: center;
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

export default RecruitmentLayout;
