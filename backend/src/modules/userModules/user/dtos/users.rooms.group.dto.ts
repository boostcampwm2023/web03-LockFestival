export class UsersRoomsGroupDto {
  themeId: number;
  themeName: string;
  posterImageUrl: string;
  branchName: string;
  groupId: number;
  recruitmentContent: string;

  constructor({ themeId, themeName, posterImageUrl, branchName, groupId, recruitmentContent }) {
    this.themeId = themeId;
    this.themeName = themeName;
    this.posterImageUrl = posterImageUrl;
    this.branchName = branchName;
    this.groupId = groupId;
    this.recruitmentContent = recruitmentContent;
  }
}
