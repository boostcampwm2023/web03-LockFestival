export class UserInfoResponseDto {
  constructor(
    private readonly accessToken: string,
    private readonly nickname: string,
    private readonly profileImageUrl: string,
    private readonly isMoreInfo: boolean
  ) {}
}
