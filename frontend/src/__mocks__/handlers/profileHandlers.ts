import { http, HttpResponse } from 'msw';
import { Profile } from 'types/profile';
import { SERVER_URL } from '@config/server';

const profileHandlers = [
  http.get(SERVER_URL + '/users/profile', () => {
    if (localStorage.getItem('com.naver.nid.access_token')) {
      return HttpResponse.json<Profile>({
        nickname: '프엔',
        isMoreInfo: true,
        profileImageUrl: '',
      });
    } else {
      return new HttpResponse('Not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    }
  }),
];

export default profileHandlers;
