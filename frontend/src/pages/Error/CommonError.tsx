import { FallbackProps } from 'react-error-boundary';
import { isAxiosError } from 'axios';
import tw, { css, styled } from 'twin.macro';
import Button from '@components/Button/Button';
import LoginModal from '@components/LoginModal/LoginModal';
import useModal from '@hooks/useModal';
import Modal from '@components/Modal/Modal';

const CommonError = ({ error }: FallbackProps) => {
  const { openModal, closeModal } = useModal();

  const handleLogin = () => {
    localStorage.setItem('lastVisited', location.pathname);

    openModal(Modal, {
      children: <LoginModal onClose={() => closeModal(Modal)} />,
      onClose: () => closeModal(Modal),
      closeOnExternalClick: true,
    });
  };

  if (isAxiosError(error) && error.response) {
    const { status } = error.response;

    if (status === 401) {
      return (
        <ErrorLayout>
          <ErrorContainer>
            <ErrorContent>
              <ErrorHeader>해당 기능을 이용하려면 로그인해주세요!</ErrorHeader>
              <Button isIcon={false} font="maplestory" size="l-bold" onClick={handleLogin}>
                <>로그인 하기</>
              </Button>
            </ErrorContent>
          </ErrorContainer>
        </ErrorLayout>
      );
    }
  }

  return <ErrorLayout>서버 에러</ErrorLayout>;
};

const ErrorLayout = styled.div([
  tw`w-full text-xl text-white`,
  css`
    height: calc(100vh - 6rem);
    display: flex;
    align-items: center;
    justify-self: center;
  `,
]);

const ErrorContainer = styled.div([
  tw`font-maplestory`,
  css`
    margin: 0 auto;
  `,
]);

const ErrorContent = styled.div([
  css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
]);

const ErrorHeader = styled.h2([
  tw`h-[6rem]`,
  css`
    display: flex;
    align-items: center;
  `,
]);

export default CommonError;
