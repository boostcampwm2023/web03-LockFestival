import { FallbackProps } from 'react-error-boundary';
import tw, { styled, css } from 'twin.macro';

const ErrorFallBack = ({ error, resetErrorBoundary }: FallbackProps) => {
  //TODO: 에러시 재시도 할 함수 이후에 추가 (resetErrorBoundary)
  return (
    <section>
      <ErrorText>
        <h1>{error.message}</h1>
      </ErrorText>
    </section>
  );
};

export default ErrorFallBack;

const ErrorText = styled.div([
  tw`font-pretendard text-xl text-white`,
  css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50rem;
    gap: 5rem;
    justify-content: center;
    align-items: center;
  `,
]);
