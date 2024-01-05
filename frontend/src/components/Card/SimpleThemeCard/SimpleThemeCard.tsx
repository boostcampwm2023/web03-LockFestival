import tw, { css, styled } from 'twin.macro';
import { SimpleThemeCardData } from 'types/theme';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';
import ThemeDetailsModal from '@components/ThemeDetailsModal/ThemeDetailsModal';
import { useRecoilValue } from 'recoil';
import isSwipingAtom from '@store/isSwipingAtom';

const SimpleThemeCard = ({ themeId, themeName, posterImageUrl }: SimpleThemeCardData) => {
  const { openModal, closeModal } = useModal();
  const isSwiping = useRecoilValue(isSwipingAtom);

  return (
    <CardContainer
      key={themeId}
      onClick={() => {
        !isSwiping &&
          openModal(Modal, {
            children: <ThemeDetailsModal themeId={themeId} onClose={() => closeModal(Modal)} />,
            onClose: () => closeModal(Modal),
            closeOnExternalClick: true,
          });
      }}
    >
      <CardImg id={themeId.toString()} alt="테마사진" src={posterImageUrl} />
      <CardText>{themeName}</CardText>
    </CardContainer>
  );
};

const CardContainer = styled.div([
  tw`font-pretendard text-white bg-gray rounded-[2rem] mx-3 p-3 gap-[1rem]`,
  tw`desktop:(text-s h-[28.4rem] w-[18.2rem])`,
  tw`tablet:(text-s h-[24rem] w-[15.2rem])`,
  tw`mobile:(text-xs h-[18.2rem] w-[11.2rem] rounded-[1.4rem] mx-1 p-2 gap-[0.5rem])`,
  css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    cursor: pointer;
  `,
]);

const CardImg = styled.img([
  tw`mb-2 rounded-[1.5rem]`,
  css`
    width: 100%;
    aspect-ratio: 9/13;
  `,
]);

const CardText = styled.span([
  tw`w-[90%]`,
  css`
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  `,
]);
export default SimpleThemeCard;
