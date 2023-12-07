import MakeGroupModal from '@components/Modal/MakeGroupModal/MakeGroupModal';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';
import CardInfoLabel from '../CardInfoLabel/CardInfoLabel';
import UnderLineButton from '../UnderLineButton/UnderLineButton';

interface Props {
  themeId: number;
  posterImageUrl: string;
  brandBranchName: string;
  themeName: string;
  handleClickFlipButton: () => void;
}

const HeadCard = ({
  themeId,
  posterImageUrl,
  brandBranchName,
  themeName,
  handleClickFlipButton,
}: Props) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const handleGoRecruitment = () => {
    navigate('/recruitment');
  };

  const handleCreateRoom = () => {
    const selectedTheme = {
      themeId,
      posterImageUrl,
      branchName: brandBranchName.split(' ')[0],
      themeName,
    };

    openModal(Modal, {
      children: <MakeGroupModal selectedTheme={selectedTheme} onClose={() => closeModal(Modal)} />,
      onClose: () => closeModal(Modal),
      closeOnExternalClick: false,
    });
  };

  return (
    <>
      <LeftSection>
        <ThemeImg src={posterImageUrl} alt="테마_이미지" />
      </LeftSection>
      <RightSection>
        <CardInfoLabel labelName="지점" labelContent={<>{brandBranchName}</>} />
        <CardInfoLabel labelName="테마명" labelContent={<>{themeName}</>} />
        <ButtonWrapper
          onMouseDown={(e: React.MouseEvent) => {
            e.preventDefault();
          }}
        >
          <UnderLineButton children={<>모집 바로가기</>} onClick={handleGoRecruitment} />
          <UnderLineButton children={<>방 생성하기</>} onClick={handleCreateRoom} />
          <UnderLineButton children={<>상세보기</>} onClick={handleClickFlipButton} />
        </ButtonWrapper>
      </RightSection>
    </>
  );
};

export default HeadCard;

const LeftSection = styled.div([tw`w-[40%] bg-gray-dark rounded-default p-3`]);
const ThemeImg = styled.img([tw`w-[100%] rounded-default`]);
const RightSection = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.6rem;
    padding-top: 14%;
  `,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    gap: 1.6rem;
    margin-top: 15%;
  `,
]);