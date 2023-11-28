import { GroupFindResponseDto } from '@group/dtos/group.find.response.dto';
import { PaginationMetaDto } from '@src/dtos/pagination.meta.dto';

export class GroupsResponseDto {
  _meta: PaginationMetaDto;
  data: GroupFindResponseDto[];
  constructor(restCount: number, nextCursorGroupId: number, data: GroupFindResponseDto[]) {
    this._meta = new PaginationMetaDto(restCount, nextCursorGroupId);
    this.data = data;
  }
}
