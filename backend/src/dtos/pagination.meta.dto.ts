import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaDto {
  @ApiProperty({
    description: '더 받을 수 있는 남은 데이터의 개수 (0이면 더이상 받을 수 없음)',
    example: 30,
  })
  restCount: number;
  @ApiProperty({
    description: '다음 요청에 사용할 커서 (다음 요청이 없으면 undefined)',
    example: 9,
    examples: [1, undefined],
  })
  nextCursor: number | string | undefined;
  constructor(restCount: number, nextCursor: number | string | undefined) {
    this.restCount = restCount;
    this.nextCursor = nextCursor;
  }
}
