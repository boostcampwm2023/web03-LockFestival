import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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

export default RoomList;
