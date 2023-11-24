import { css } from '@emotion/react';
import { MouseEvent } from 'react';
import { ModalProps } from 'types/modal';
import tw, { styled } from 'twin.macro';

const Modal = ({ children, onClose, closeOnExternalClick, isOpen }: ModalProps) => {
  const handleCloseModal = (e: MouseEvent<HTMLDivElement>) => {
    if (!closeOnExternalClick) {
      return;
    }

    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <ModalBackground onClick={handleCloseModal}>
          <ModalContainer>{children}</ModalContainer>
        </ModalBackground>
      )}
    </>
  );
};

const ModalBackground = styled.div([
  tw`font-pretendard text-white-60`,
  css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(6, 5, 5, 0.63);
    z-index: 99;
  `,
]);

const ModalContainer = styled.div([
  tw`rounded-[2rem] bg-gray-light`,
  tw`desktop:(min-w-[50rem] min-h-[40rem])`,
  tw`mobile:(min-w-[20rem] min-h-[16rem])`,
]);

export default Modal;
