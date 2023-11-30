import groupListMock from '@__mocks__/room/roomListMock';
import { SERVER_URL } from '@config/server';
import { HttpResponse, http } from 'msw';
import { GroupProps } from 'types/group';

const roomListHandlers = [
  http.get(SERVER_URL + '/rooms', ({ request }) => {
    const bearerToken = request.headers.get('Authorization');

    if (!bearerToken) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json<Array<GroupProps>>(groupListMock);
  }),
];

export default roomListHandlers;
