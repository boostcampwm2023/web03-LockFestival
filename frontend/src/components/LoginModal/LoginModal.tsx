import { ModalProps } from 'types/modal';
import NaverLogin from '@components/LoginModal/NaverLogin/NaverLogin';
import tw, { css, styled } from 'twin.macro';
import ModalCloseButton from '@components/Button/ModalCloseButton';

function LoginModal(onClose: ModalProps['onClose']) {
  return (
    <Layout>
      <ModalCloseButton onClose={onClose} />
      <BottomWrapper>
        Lock Festival 로그인
        <NaverLogin />
      </BottomWrapper>
    </Layout>
  );
}

export default LoginModal;

const Layout = styled.div([tw`p-6`]);

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
