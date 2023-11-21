import fetchThemesByRandomGenres from '@apis/fetchThemesByRandomGenres';

const QUERY_MANAGEMENT = {
  randomThemes: {
    key: 'randomThemes',
    fn: fetchThemesByRandomGenres,
  },
};

export default QUERY_MANAGEMENT;
