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
  smallRegion: string | undefined;
  bigRegion: string | undefined;
  handleClickFlipButton: () => void;
}

const HeadCard = ({
  themeId,
  posterImageUrl,
  brandBranchName,
  themeName,
  smallRegion,
  bigRegion,
  handleClickFlipButton,
}: Props) => {
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  const handleGoRecruitment = () => {
    navigate(
      `/recruitment?smallRegion=${smallRegion}&bigRegion=${bigRegion}&themeName=${themeName}`
    );
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
    <Layout>
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
    </Layout>
  );
};

export default HeadCard;

const Layout = styled.div([
  css`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    width: 100%;
  `,
]);

const LeftSection = styled.div([
  tw`w-[26rem] bg-gray-dark rounded-default p-3 mobile:(w-[16rem] p-2 rounded-[2rem])`,
]);
const ThemeImg = styled.img([tw`w-full aspect-[9/13] rounded-default mobile:(rounded-[1.8rem])`]);
const RightSection = styled.div([
  css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 14%;
    width: 100%;
  `,
  tw`gap-4 pt-[14%] mobile:(gap-2 pt-[10%])`,
]);

const ButtonWrapper = styled.div([
  css`
    display: flex;
    justify-content: space-around;
    margin-top: 12%;
  `,
  tw`w-[100%]`,
]);
