import { SERVER_URL } from '@config/server';
import axios from 'axios';
import { ThemeDetailsData } from 'types/theme';

interface Props {
  pageParam: number;
  query: string;
}

interface FetchThemesByPage {
  _meta: {
    restCount: number;
    nextPage: number;
  };
  data: Array<ThemeDetailsData>;
}

const fetchThemesByPage = async ({ pageParam, query }: Props) => {
  const queryString = `page=${pageParam}&query=${query}&count=10`;

  return (
    await axios<FetchThemesByPage>({ method: 'get', url: SERVER_URL + `/themes?${queryString}` })
  ).data;
};

export default fetchThemesByPage;
