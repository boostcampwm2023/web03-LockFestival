import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '@src/dtos/pagination.meta.dto';
import { GroupFindResponseDto } from '@group/dtos/group.find.response.dto';

export class GroupsResponseDto {
  @ApiProperty({ type: PaginationMetaDto })
  _meta: PaginationMetaDto;
  @ApiProperty({ type: [GroupFindResponseDto] })
  data: GroupFindResponseDto[];
  constructor(restCount: number, nextCursorGroupId: number, data: GroupFindResponseDto[]) {
    this._meta = new PaginationMetaDto(restCount, nextCursorGroupId);
    this.data = data;
  }
}
