import { useQuery } from '@tanstack/react-query';
import { ThemeDetailsData } from 'types/theme';
import QUERY_MANAGEMENT from '@constants/queryManagement';

const useThemeDetailsQuery = (themeId: number) => {
  const { data, isSuccess, isError, isLoading } = useQuery<ThemeDetailsData>({
    queryKey: QUERY_MANAGEMENT['themeDetails'].key,
    queryFn: () => QUERY_MANAGEMENT['themeDetails'].fn(themeId),
    retry: false,
  });

  return { data, isSuccess, isError, isLoading };
};

export default useThemeDetailsQuery;
