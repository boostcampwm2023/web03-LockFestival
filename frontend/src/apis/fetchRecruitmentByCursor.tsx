import userInstance from '@config/userInstance';
import { FetchRecruitmentByCursor } from 'types/recruitment';

interface RecruitmentFilterList {
  cursorGroupId: number | undefined;
  isDesc?: boolean;
  count?: number;
  recruitmentCompleted?: boolean;
  appointmentCompleted?: boolean;
  bigRegion?: string;
  smallRegion?: string;
  themeName?: string;
}

const FIRST_CURSOR = -1;

const fetchRecruitmentByCursor = async (queryList: RecruitmentFilterList) => {
  const { cursorGroupId } = queryList;

  queryList.cursorGroupId = cursorGroupId !== FIRST_CURSOR ? cursorGroupId : undefined;

  const queryString = queryList
    ? new URLSearchParams([...Object.entries(queryList)]).toString()
    : '';

  return (
    await userInstance<FetchRecruitmentByCursor>({ method: 'get', url: `/groups?${queryString}` })
  ).data;
};

export default fetchRecruitmentByCursor;
