export interface SimpleThemeCardData {
  themeId: number;
  themeName: string;
  posterImageUrl: string;
}

export type ThemeDetailsData = SimpleThemeCardData & ThemeExtraData;

export interface ThemeExtraData {
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
