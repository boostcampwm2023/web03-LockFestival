export class UserNaverDto {
  id: string;
  profileImageUrl: string;
  constructor({ id, profile_image }) {
    this.id = id;
    this.profileImageUrl = profile_image;
  }
}
