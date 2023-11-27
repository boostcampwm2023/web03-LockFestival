export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export const convertBoolToSort = (isDesc: boolean): Sort => {
  if (isDesc) {
    return Sort.DESC;
  }
  return Sort.ASC;
};
