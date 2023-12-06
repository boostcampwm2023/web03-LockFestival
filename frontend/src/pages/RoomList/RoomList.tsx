import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import tw, { css, styled } from 'twin.macro';
import RoomListLayout from './components/RoomListLayout';
import CommonError from '@pages/Error/CommonError';

const RoomList = () => {
  return (
    <ErrorBoundary FallbackComponent={(fallbackProps) => <CommonError {...fallbackProps} />}>
      <Suspense fallback={<div>로딩중...</div>}>
        <RoomListLayout />
      </Suspense>
    </ErrorBoundary>
  );
};

const Error = styled.div([
  tw`font-pretendard text-white text-xl h-[40rem]`,
  css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
]);

export default RoomList;
