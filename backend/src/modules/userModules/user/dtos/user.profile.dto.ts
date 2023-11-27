import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ description: '유저 닉네임', example: '킹왕짱' })
  nickname: string;
  @ApiProperty({ description: '프로필 사진 URL', example: 'http://profile.image' })
  profileImageUrl: string;
  @ApiProperty({ description: '회원가입 추가정보 입력 여부', example: false })
  isMoreInfo: boolean;
}
