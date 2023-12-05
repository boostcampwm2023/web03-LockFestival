import { ApiProperty } from '@nestjs/swagger';
import { PaginationMetaDto } from '@src/dtos/pagination.meta.dto';
import { UsersRoomsDetailsDto } from '@user/dtos/uesrs.rooms.details.dto';

export class UsersRoomsResponseDto {
  @ApiProperty({ type: PaginationMetaDto })
  _meta: PaginationMetaDto;
  @ApiProperty({ type: [UsersRoomsDetailsDto] })
  data: UsersRoomsDetailsDto[];

  constructor(restCount: number, nextCursorGroupId: number, data: UsersRoomsDetailsDto[]) {
    this._meta = new PaginationMetaDto(restCount, nextCursorGroupId);
    this.data = data;
  }
}
