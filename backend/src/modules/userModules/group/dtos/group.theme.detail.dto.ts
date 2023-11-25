export class GroupThemeDetailDto {
  brandBranchName: string;
  themeName: string;
  posterImageUrl: string;
  themeAddress: string;

  constructor({ brandBranchName, themeName, posterImageUrl, themeAddress }) {
    this.brandBranchName = brandBranchName;
    this.themeName = themeName;
    this.posterImageUrl = posterImageUrl;
    this.themeAddress = themeAddress;
  }
}
