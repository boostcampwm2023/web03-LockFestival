export interface JoinData {
  nickname: string;
  profileImageUrl: string | null;
  favoriteGenres: string[];
  favoriteThemes: string[];
}

export interface Profile {
  nickname: string;
  profileImageUrl: string | null;
  isMoreInfo: boolean;
}
