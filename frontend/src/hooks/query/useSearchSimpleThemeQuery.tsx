import fetchThemeByName from '@apis/fetchThemeByName';
import { useQuery } from '@tanstack/react-query';
const useSearchSimpleThemeQuery = (value: string) => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['qwe', value],
    queryFn: () => fetchThemeByName(value),
    staleTime: 60 * 60 * 3600,
    gcTime: 60 * 60 * 3600,
    enabled: value !== '',
  });

  return { data, isLoading, isSuccess };
};

export default useSearchSimpleThemeQuery;
