import { SERVER_URL } from '@config/server';
import { REQUEST_INFO } from '@constants/geolocation';
import axios from 'axios';
import { SimpleThemeCardData } from 'types/theme';

interface FetchThemesByLocation {
  geolocation: {
    latitude: number;
    longitude: number;
  };
}

interface ThemeByLocationData {
  _meta: Record<string, number>;
  data: SimpleThemeCardData[];
}

const fetchThemesByLocation = async ({ geolocation }: FetchThemesByLocation) => {
  return (
    await axios<ThemeByLocationData>({
      method: 'get',
      url:
        SERVER_URL +
        `/themes/location?boundary=${REQUEST_INFO.km}&count=${REQUEST_INFO.themeCount}&x=${geolocation.latitude}&y=${geolocation.longitude}`,
    })
  ).data;
};

export default fetchThemesByLocation;
