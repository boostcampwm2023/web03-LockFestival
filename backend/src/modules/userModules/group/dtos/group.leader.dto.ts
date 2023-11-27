export class GroupLeaderDto {
  nickname: string;
  profileImageUrl: string;

  constructor({ nickname, profileImageUrl }) {
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}
