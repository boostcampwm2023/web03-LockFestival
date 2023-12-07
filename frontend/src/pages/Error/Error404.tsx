import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';
import tw, { styled, css } from 'twin.macro';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <ErrorContainer>
        <ErrorContent>
          <ErrorHeader>404 Not Found!</ErrorHeader>
          <ErrorImage src="/assets/images/NotFound/NotFound.png" alt="NotFound" />
          <Button isIcon={false} font="maplestory" size="l-bold" onClick={() => navigate('/')}>
            <>메인페이지로 돌아가기</>
          </Button>
        </ErrorContent>
      </ErrorContainer>
    </ErrorLayout>
  );
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

const ErrorImage = styled.img([tw`w-[30rem] h-[30rem] mb-[2rem]`]);

export default Error404;
