import { IsOptional, IsUrl, Length, Matches } from 'class-validator';

const ERROR_MESSAGE = '닉네임은 특수문자를 제외한 2~8자의 영문, 한글, 숫자만 가능합니다.';

export class UserInfoRequestDto {
  @IsOptional()
  @Length(2, 8, { message: ERROR_MESSAGE })
  @Matches(/^[a-zA-Z0-9가-힣]+$/, {
    message: ERROR_MESSAGE,
  })
  nickname: string;

  @IsOptional()
  @IsUrl()
  profileImageUrl: string;

  favoriteGenres: Array<string>;
  //TODO: 추후 개발시 타입 변경 필요
  favoriteThemes: Array<number>;
}
