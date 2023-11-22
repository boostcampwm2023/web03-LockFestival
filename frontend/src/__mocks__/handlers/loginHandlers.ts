import { http, HttpResponse } from 'msw';
import { SERVER_URL } from '@config/server';

const loginHandlers = [
  http.get(SERVER_URL + '/auth/naver', ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');

    if (!code) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ code });
  }),
];

export default loginHandlers;
