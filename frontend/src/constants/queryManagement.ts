import fetchRecruitmentByCursor from '@apis/fetchRecruitmentByCursor';
import fetchThemesByLocation from '@apis/fetchThemesByLocation';
import fetchThemesByRandomGenres from '@apis/fetchThemesByRandomGenres';

const QUERY_MANAGEMENT = {
  geolocation: {
    key: 'geolocation',
    fn: fetchThemesByLocation,
  },
  randomThemes: {
    key: 'randomThemes',
    fn: fetchThemesByRandomGenres,
  },
  recruitmentList: {
    key: 'recruitmentList',
    fn: fetchRecruitmentByCursor,
  },
};

export default QUERY_MANAGEMENT;
