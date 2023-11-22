import { ModalProps } from 'types/modal';
import Button from '@components/Button/Button';
import { FaXmark } from 'react-icons/fa6';
import NaverLogin from '@components/LoginModal/NaverLogin/NaverLogin';
import tw, { css, styled } from 'twin.macro';

function LoginModal(onClose: ModalProps['onClose']) {
  return (
    <>
      <ButtonWrapper>
        <Button isIcon={true} onClick={onClose}>
          <>
            <FaXmark />
          </>
        </Button>
      </ButtonWrapper>
      <BottomWrapper>
        Lock Festival 로그인
        <NaverLogin />
      </BottomWrapper>
    </>
  );
}

export default LoginModal;

const ButtonWrapper = styled.div([
  css`
    display: flex;
    width: 100%;
    justify-content: flex-end;
  `,
  tw`
    p-4
  `,
]);

const BottomWrapper = styled.div([
  tw`font-maplestory text-l text-white m-5`,
  css`
    display: flex;
    height: 25rem;
    gap: 5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
]);
