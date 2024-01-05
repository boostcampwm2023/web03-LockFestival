import fetchRecruitmentByCursor from '@apis/fetchRecruitmentByCursor';
import fetchThemesByLocation from '@apis/fetchThemesByLocation';
import fetchThemesByRandomGenres from '@apis/fetchThemesByRandomGenres';
import fetchThemeDetails from '@apis/fetchThemeDetails';
import fetchRoomList from '@apis/fetchRoomList';
import fetchUserProfile from '@apis/fetchUserProfile';
import fetchThemesByPage from './../apis/fetchThemesByPage';
import fetchThemeTimeTable from '@apis/fetchThemeTimeTable';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import fetchCheckNickName from '@apis/fetchCheckNickName';

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
  themeTimeTable: {
    key: 'themeTimeTable',
    fn: (themeId: number, date: Value) => fetchThemeTimeTable(themeId, date),
  },
  isValidNickName: {
    key: 'isValidNickName',
    fn: (input: string) => fetchCheckNickName(input),
  },
};

export default QUERY_MANAGEMENT;
