import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import GroupListLayout from './components/GroupListLayout';
import tw, { css, styled } from 'twin.macro';

const RoomList = () => {
  return (
    <ErrorBoundary fallback={<Error>그룹 채팅방을 불러오는데 에러가 발생했어요!</Error>}>
      <Suspense fallback={<div>로딩중...</div>}>
        <GroupListLayout />
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
