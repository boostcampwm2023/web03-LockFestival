import { IsNotEmpty, Length, Matches } from 'class-validator';

const ERROR_MESSAGE = '닉네임은 특수문자를 제외한 2~8자의 영문, 한글, 숫자만 가능합니다.';

export class NicknameRequestDto {
  @Length(2, 8, { message: ERROR_MESSAGE })
  @IsNotEmpty({ message: ERROR_MESSAGE })
  @Matches(/^[a-zA-Z0-9가-힣]+$/, {
    message: ERROR_MESSAGE,
  })
  nickname: string;
}
