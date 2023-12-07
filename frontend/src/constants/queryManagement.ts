import fetchRecruitmentByCursor from '@apis/fetchRecruitmentByCursor';
import fetchThemesByLocation from '@apis/fetchThemesByLocation';
import fetchThemesByRandomGenres from '@apis/fetchThemesByRandomGenres';
import fetchThemeDetails from '@apis/fetchThemeDetails';
import fetchRoomList from '@apis/fetchRoomList';
import fetchUserProfile from '@apis/fetchUserProfile';
import fetchThemesByPage from './../apis/fetchThemesByPage';

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
  themeDetails: {
    key: ['themeDetails'],
    fn: (themeId: number) => fetchThemeDetails(themeId),
  },
  roomList: {
    key: 'roomList',
    fn: fetchRoomList,
  },
  profile: {
    key: 'profile',
    fn: fetchUserProfile,
  },
  themeSearchResult: {
    key: 'themeSearchResult',
    fn: fetchThemesByPage,
  },
};

export default QUERY_MANAGEMENT;
