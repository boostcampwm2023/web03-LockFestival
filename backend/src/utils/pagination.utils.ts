import { PaginationDto } from '@src/dtos/pagination.dto';

export const calcRestCount = (
  totalCount: number,
  paginationInfo: PaginationDto,
  themeCount: number
): number => {
  const restCount: number = Math.max(
    totalCount - (paginationInfo.page * paginationInfo.count + themeCount),
    0
  );
  return restCount;
};
