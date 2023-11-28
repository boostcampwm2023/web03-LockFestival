import { useQuery } from '@tanstack/react-query';
import fetchThemeDetails from '@apis/fetchThemeDetails';
import { ThemeDetailsData } from 'types/theme';

const useThemeDetailsQuery = (themeId: number) => {
  const { data, isSuccess, isError, isLoading } = useQuery<ThemeDetailsData>({
    queryKey: ['themeDetails'],
    queryFn: () => fetchThemeDetails(themeId),
    retry: false,
  });

  return { data, isSuccess, isError, isLoading };
};

export default useThemeDetailsQuery;
