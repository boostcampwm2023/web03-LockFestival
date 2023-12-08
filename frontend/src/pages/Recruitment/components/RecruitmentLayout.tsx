import GroupInfoCard from '@components/Card/GroupInfoCard/GroupInfoCard';
import useRecruitmentListInfiniteQuery from '@hooks/query/useRecruitmentListInfiniteQuery';
import useIntersectionObserver from '@hooks/intersectionObserver/useIntersectionObserver';
import { useRef } from 'react';
import tw, { css, styled } from 'twin.macro';
import { FaPlus } from 'react-icons/fa6';
import Button from '@components/Button/Button';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';
import MakeGroupModal from '@components/Modal/MakeGroupModal/MakeGroupModal';
import { useRecoilValue } from 'recoil';
import userAtom from '@store/userAtom';
import LoginModal from '@components/LoginModal/LoginModal';

const RecruitmentLayout = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const user = useRecoilValue(userAtom);

  const { openModal, closeModal } = useModal();

  const { data, fetchNextPage, hasNextPage, isFetching } = useRecruitmentListInfiniteQuery();

  useIntersectionObserver({
    eventHandler: fetchNextPage,
    targetRef,
  });

  const checkIsLogin = () => {
    if (!user.nickname) {
      openModal(Modal, {
        children: (
          <LoginModal
            onClose={() => closeModal(Modal)}
            explainText="로그인 이후 모집글을 작성할 수 있어요!"
          />
        ),
        onClose: () => closeModal(Modal),
        closeOnExternalClick: true,
      });
      return;
    }

    openModal(Modal, {
      children: <MakeGroupModal onClose={() => closeModal(Modal)} />,
      onClose: () => closeModal(Modal),
      closeOnExternalClick: false,
    });
  };

  return (
    <Container>
      <AddButton isIcon={false} size="l" onClick={checkIsLogin}>
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
      </RecruitList>
      {isFetching && <TextContainer>모집글을 불러오는중 ...</TextContainer>}
      {data?.pages[0]?.data?.length === 0 && (
        <TextContainer>모집글이 하나도 없어요. ㅁ_ㅁ</TextContainer>
      )}
      {data?.pages[0]?.data?.length && !hasNextPage && (
        <TextContainer>마지막 모집글입니다!</TextContainer>
      )}
      <div ref={targetRef}></div>
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
