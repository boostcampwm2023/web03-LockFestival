import userInstance from '@config/userInstance';
import { Value } from 'react-calendar/dist/cjs/shared/types';

const fetchThemeTimeTable = async (themeId: number, date: Value) => {
  return (await userInstance({ method: 'get', url: `/themes/${themeId}/timetable?date=${date}` }))
    .data;
};

export default fetchThemeTimeTable;
