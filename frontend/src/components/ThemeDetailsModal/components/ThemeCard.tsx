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
      <img src={posterImageUrl} alt="추천_테마_포스터_이미지" />
      <div>{name}</div>
    </ThemeCardBox>
  );
};

export default ThemeCard;

const ThemeCardBox = styled.div([
  css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    justify-content: space-between;
    align-items: center;
    width: 11rem;
    height: 16rem;
    padding: 1.2rem;
    text-align: center;
    cursor: pointer;

    img {
      width: 7.8rem;
      height: 13.6rem;
      border-radius: 1.5rem;
    }
  `,
  tw`
    bg-gray-dark rounded-[2rem] font-pretendard text-s
  `,
]);
