export class UserInfoRequestDto {
  nickname: string;
  profileImageUrl: string;
  favoriteGenres: Array<string>;
  //TODO: 추후 개발시 타입 변경 필요
  favoriteThemes: Array<number>;
}
