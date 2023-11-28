import fetchThemesByLocation from '@apis/fetchThemesByLocation';
import fetchThemesByRandomGenres from '@apis/fetchThemesByRandomGenres';
import fetchThemeDetails from '@apis/fetchThemeDetails';

const QUERY_MANAGEMENT = {
  geolocation: {
    key: 'geolocation',
    fn: fetchThemesByLocation,
  },
  randomThemes: {
    key: 'randomThemes',
    fn: fetchThemesByRandomGenres,
  },
  themeDetails: {
    key: ['themeDetails'],
    fn: (themeId: number) => fetchThemeDetails(themeId),
  },
};

export default QUERY_MANAGEMENT;
