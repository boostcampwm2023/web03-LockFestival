import { ApiProperty } from '@nestjs/swagger';

export class GroupLeaderDto {
  @ApiProperty({
    description: '방장의 닉네임',
    example: '킹왕짱',
  })
  nickname: string;
  @ApiProperty({
    description: '방장의 프로필 이미지 URL',
    example: 'https://d2u3dcdbebyaiu.cloudfront.net/profile/1',
  })
  profileImageUrl: string;

  constructor({ nickname, profileImageUrl }) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}
