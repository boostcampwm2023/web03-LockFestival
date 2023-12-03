import { styled, css } from 'twin.macro';
import Button from './Button';
import { ModalProps } from 'types/modal';
import { FaXmark } from 'react-icons/fa6';

interface Props {
  onClose: ModalProps['onClose'];
}

const ModalCloseButton = ({ onClose }: Props) => {
  return (
    <ButtonWrapper>
      <Button isIcon={true} onClick={onClose}>
        <>
          <FaXmark />
        </>
      </Button>
    </ButtonWrapper>
  );
};

export default ModalCloseButton;

const ButtonWrapper = styled.div([
  css`
    display: flex;
    justify-content: flex-end;
  `,
]);
