import userInstance from '@config/userInstance';

interface JoinData {
  nickname: string;
  profileImageUrl: string | null;
  favoriteGenres: string[];
  favoriteThemes: string[];
}

const fetchJoin = async (joinData: JoinData) => {
  return (
    await userInstance({
      method: 'patch',
      url: `/users/user-info`,
      data: joinData,
    })
  ).data;
};

export default fetchJoin;
