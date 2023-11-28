import { http, HttpResponse } from 'msw';
import { themeDetailsByThemeId } from '@__mocks__/themeDetails/themeDetailsByThemeId';
import { SERVER_URL } from '@config/server';
import { ThemeDetailsData } from 'types/theme';

const themeDetailsHandler = [
  http.get(SERVER_URL + '/themes/:themeId/details', (req) => {
    const { themeId }: any = req.params;
    const themeDetails = themeDetailsByThemeId[themeId];

    if (themeDetails) {
      return HttpResponse.json<ThemeDetailsData>(themeDetails);
    } else {
      return new HttpResponse('Theme not found', { status: 404 });
    }
  }),
];

export default themeDetailsHandler;
