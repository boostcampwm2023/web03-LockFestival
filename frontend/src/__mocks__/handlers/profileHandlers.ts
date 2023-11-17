import { http, HttpResponse } from 'msw';
import { Profile } from 'types/profile';
import { SERVER_URL } from '@config/server';

const profileHandlers = [
  http.get(SERVER_URL + '/users/profile', ({ cookies }) => {
    //TODO: jwt 구현 후 미로그인 구현하기

    return HttpResponse.json<Profile>({
      nickname: '프엔',
      isMoreInfo: true,
      profileImageUrl: '',
    });
  }),
];

export default profileHandlers;
