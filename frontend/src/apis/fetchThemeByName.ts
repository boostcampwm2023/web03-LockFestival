import userInstance from '@config/userInstance';

interface SearchThemeData {
  themeId: number;
  themeName: string;
  posterImageUrl: string;
  branchName: string;
}

const fetchThemeByName = async (query: string) => {
  const res = await userInstance<Array<SearchThemeData>>({
    method: 'get',
    url: `/themes/simple-themes?query=${query}`,
  });

  return res.data;
};

export default fetchThemeByName;
