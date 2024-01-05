import tw, { styled, css } from 'twin.macro';
import { ModalProps } from 'types/modal';
import Modal from '@components/Modal/Modal';
import useModal from '@hooks/useModal';
import ThemeDetailsModal from '../ThemeDetailsModal';

interface ThemeCardProps {
  themeId: number;
  posterImageUrl: string;
  name: string;
  onClose: ModalProps['onClose'];
}

const ThemeCard = ({ themeId, posterImageUrl, name, onClose }: ThemeCardProps) => {
  const { openModal, closeModal } = useModal();
  return (
    <ThemeCardBox
      key={themeId}
      onClick={() => {
        onClose();
        setTimeout(() => {
          openModal(Modal, {
            children: <ThemeDetailsModal themeId={themeId} onClose={() => closeModal(Modal)} />,
            onClose: () => closeModal(Modal),
            closeOnExternalClick: true,
          });
        }, 100);
      }}
    >
      <ThemeCardImg src={posterImageUrl} alt="추천_테마_포스터_이미지" />
      <ThemeCardName>{name}</ThemeCardName>
    </ThemeCardBox>
  );
};

export default ThemeCard;

const ThemeCardBox = styled.div([
  tw`
    h-auto p-3 bg-gray-dark rounded-[2rem] font-pretendard text-s gap-3
  `,
  tw`desktop:(w-[13rem])`,
  tw`tablet:(w-[10.4rem])`,
  tw`mobile:(w-[5.8rem] p-2 rounded-[1.2rem] gap-2 text-xs)`,
  css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
  `,
]);

const ThemeCardImg = styled.img([
  tw`rounded-[1.5rem] mobile:(rounded-[0.6rem])`,
  css`
    width: 100%;
    aspect-ratio: 9/13;
  `,
]);

const ThemeCardName = styled.div([
  css`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
  `,
]);
