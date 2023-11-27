import { ApiProperty } from '@nestjs/swagger';

export class GenreDto {
  @ApiProperty({
    name: 'name',
    description: '장르 이름',
    example: '공포',
    examples: ['공포', '코믹', 'SF', '판타지', '드라마', '로맨스', '스릴러', '추리'],
  })
  name: string;
  @ApiProperty({
    name: 'id',
    description: '분류용 장르 id',
    example: 1,
    examples: [1, 2, 3, 4, 5, 6, 7, 8],
  })
  id: number;
}
