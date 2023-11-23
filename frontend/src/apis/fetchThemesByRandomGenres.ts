import { SERVER_URL } from '@config/server';
import axios from 'axios';
import { SimpleThemeCardData } from 'types/theme';

interface FetchThemesByRandomGenres {
  genre: string;
  themes: Array<SimpleThemeCardData>;
}

const fetchThemesByRandomGenres = async () => {
  //TODO: axios 인스턴스 개발 후 리팩토링
  return (
    await axios<Array<FetchThemesByRandomGenres>>({
      method: 'get',
      url: SERVER_URL + `/themes/random-genres`,
    })
  ).data;
};

export default fetchThemesByRandomGenres;
