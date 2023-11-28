import axios from 'axios';
import { SERVER_URL } from '@config/server';
import { ThemeDetailsData } from 'types/theme';

const fetchThemeDetails = async (themeId: number): Promise<ThemeDetailsData> => {
  return (
    await axios({
      method: 'get',
      url: SERVER_URL + `/themes/${themeId}/details`,
    })
  ).data;
};

export default fetchThemeDetails;
