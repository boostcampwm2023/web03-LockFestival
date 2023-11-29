export interface SimpleThemeCardData {
  themeId: number;
  name: string;
  posterImageUrl: string;
}

export interface ThemeDetailsData extends SimpleThemeCardData {
  brandBranchName: string;
  realGenre: string;
  difficulty: string;
  minMember: number;
  maxMember: number;
  playTime: number;
  phone: string;
  address: string;
  website: string;
  otherThemes: SimpleThemeCardData[];
}
