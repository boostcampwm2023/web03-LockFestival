import { ApiProperty } from '@nestjs/swagger';

export class UserInfoResponseDto {
  @ApiProperty({
    description: '변경된 accessToken',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFueWNhcjg1MTVAbmF2ZXIuY29tIiwibmlja25hbWUiOiLtgrnsiqTrp6gyIiwiaWF0IjoxOTAxNDQ3MTY1LCJleHAiOjE5MDE0ODcxNjV9.p7QEwFz00QInRpvP3qvyt8H5VNaS9CQrOq-xP0j1I54',
  })
  accessToken: string;
  @ApiProperty({
    description: '변경된 닉네임',
    default: '킹스맨',
  })
  nickname: string;
  @ApiProperty({
    description: '변경된 프로필 이미지',
    default: 'http://image.com/',
  })
  profileImageUrl: string;
  @ApiProperty({
    description:
      '회원 가입 후 추가 정보 입력 여부(회원 정보 변경 API 호출이기에 매번 true로 반환될 예정)',
    default: 'true',
  })
  isMoreInfo: boolean;
  constructor(accessToken: string, nickname: string, profileImageUrl: string, isMoreInfo: boolean) {
    this.accessToken = accessToken;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
    this.isMoreInfo = isMoreInfo;
  }
}
