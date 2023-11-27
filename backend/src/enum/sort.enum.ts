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

export const convertSortToSymbol = (sort: Sort): string => {
  if (sort === Sort.ASC) {
    return '>';
  }
  return '<';
};
