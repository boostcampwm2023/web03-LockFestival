import { http, HttpResponse } from 'msw';
import { themesByGenre } from '../genresTheme/themesByGenre';
import { SERVER_URL } from '@config/server';

const START_INDEX = 0;
const END_INDEX = 3;

const themesByGenreHandler = [
  http.get(SERVER_URL + '/themes/random-genres', () => {
    const randomThemesByGenre = themesByGenre.slice(START_INDEX, END_INDEX);

    return HttpResponse.json(randomThemesByGenre);
  }),
];

export default themesByGenreHandler;
