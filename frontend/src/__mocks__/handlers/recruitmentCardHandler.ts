import { recruitmentCardMock } from '@__mocks__/recruitment/recruitmentCardMock';
import { SERVER_URL } from '@config/server';
import { HttpResponse, http } from 'msw';
import { FetchRecruitmentByCursor } from 'types/recruitment';

const FIRST_GROUP = 0;
const LAST_GROUP = 10;

const recruitmentCardHandler = [
  http.get(SERVER_URL + '/groups', ({ params }) => {
    const returnData: FetchRecruitmentByCursor = {
      _meta: {
        nextCursor: 1,
        restCount: 15,
      },
      data: recruitmentCardMock.slice(FIRST_GROUP, LAST_GROUP),
    };

    return HttpResponse.json(returnData);
  }),
];

export default recruitmentCardHandler;
