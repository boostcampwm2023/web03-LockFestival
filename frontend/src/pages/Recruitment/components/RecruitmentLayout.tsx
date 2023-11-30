import GroupInfoCard from '@components/Card/GroupInfoCard/GroupInfoCard';
import useRecruitmentListInfiniteQuery from '@hooks/query/useRecruitmentListInfiniteQuery';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useRef } from 'react';
import tw, { css, styled } from 'twin.macro';
import { FaPlus } from 'react-icons/fa6';
import Button from '@components/Button/Button';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import MakeGroupModal from '@components/Modal/MakeGroupModal/MakeGroupModal';

const RecruitmentLayout = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { openModal, closeModal } = useModal();

  const { data, fetchNextPage, hasNextPage, isFetching } = useRecruitmentListInfiniteQuery();

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  return (
    <Container>
      <AddButton
        isIcon={false}
        size="l"
        onClick={() =>
          openModal(Modal, {
            children: <MakeGroupModal onClose={() => closeModal(Modal)} />,
            onClose: () => closeModal(Modal),
            closeOnExternalClick: false,
          })
        }
      >
        <>
          모집글 작성하기
          <FaPlus color="white" />
        </>
      </AddButton>
      <RecruitList>
        {data?.pages.map((page) => {
          return page.data.map((list) => {
            return <GroupInfoCard {...list} key={list.groupDetail.groupId} />;
          });
        })}
        <div ref={targetRef}></div>
      </RecruitList>
      {isFetching && <TextContainer>모집글을 불러오는중 ...</TextContainer>}
      {data && !hasNextPage && <TextContainer>마지막 모집글입니다!</TextContainer>}
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

const AddButton = styled(Button)([
  css`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 3;
  `,
]);

export default RecruitmentLayout;
