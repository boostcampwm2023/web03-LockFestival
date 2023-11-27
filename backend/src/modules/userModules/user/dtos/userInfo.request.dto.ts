import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUrl, Length, Matches } from 'class-validator';

const ERROR_MESSAGE = '닉네임은 특수문자를 제외한 2~8자의 영문, 한글, 숫자만 가능합니다.';

export class UserInfoRequestDto {
  @IsOptional()
  @Length(2, 8, { message: ERROR_MESSAGE })
  @Matches(/^[a-zA-Z0-9가-힣]+$/, {
    message: ERROR_MESSAGE,
  })
  @ApiProperty({
    description: '변경할 닉네임\n가능한 문자열: [a-zA-Z0-9가-힣]',
    example: '킹왕짱',
    required: false,
  })
  nickname: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    description: '변경할 프로필 이미지 URL',
    example: 'http://profile.image.com/',
    required: false,
  })
  profileImageUrl: string;

  @ApiProperty({
    description: '등록할 선호 장르명 리스트 (변경 없을 시 기존 값 전달)',
    example: '["공포","스릴러","드라마"]',
  })
  favoriteGenres: Array<string>;
  //TODO: 추후 개발시 타입 변경 필요
  @ApiProperty({
    description: '등록할 선호 테마 id 리스트 (변경 없을 시 기존 값 전달)',
    example: '[1,3,10]',
  })
  favoriteThemes: Array<number>;
}
