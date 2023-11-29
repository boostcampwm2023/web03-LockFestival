import { ApiProperty } from '@nestjs/swagger';

export class PaginationPageMetaDto {
  @ApiProperty({
    description: '더 받을 수 있는 남은 데이터의 개수 (0이면 더이상 받을 수 없음)',
    example: 30,
  })
  restCount: number;
  @ApiProperty({
    description: '다음 요청 페이지 (다음 요청이 없으면 undefined)',
    example: 9,
    examples: [1, undefined],
  })
  nextPage: number | undefined;
  constructor(restCount: number, nextPage: number | undefined) {
    this.restCount = restCount;
    this.nextPage = nextPage;
  }
}
