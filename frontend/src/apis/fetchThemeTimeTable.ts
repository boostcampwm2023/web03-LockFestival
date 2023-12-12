import userInstance from '@config/userInstance';
import { Value } from 'react-calendar/dist/cjs/shared/types';

const fetchThemeTimeTable = async (themeId: number, date: Value) => {
  return (
    await userInstance({
      method: 'get',
      url: `/themes/${themeId}/timetable?date=${date}`,
      timeout: 5000,
    })
  ).data;
};

export default fetchThemeTimeTable;
