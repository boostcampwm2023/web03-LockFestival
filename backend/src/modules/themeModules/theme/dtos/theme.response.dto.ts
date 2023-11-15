export class ThemeResponseDto {
  posterImageUrl?: string;
  name: string;
  themeId: number;

  constructor({ posterImageUrl, name, id }) {
    this.posterImageUrl = posterImageUrl;
    this.name = name;
    this.themeId = id;
  }
}
