import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import useGeolocation from '@hooks/useGeolocation';
import QUERY_MANAGEMENT from '@constants/queryManagement';

const INITAL_LATITUDE = 0;

const useThemesByGeolocationQuery = () => {
  const { geolocation } = useGeolocation();

  const { data, refetch } = useQuery({
    queryKey: [QUERY_MANAGEMENT['geolocation'].key, geolocation.latitude, geolocation.longitude],
    queryFn: () => QUERY_MANAGEMENT['geolocation'].fn({ geolocation }),
    enabled: false,
  });

  useEffect(() => {
    geolocation.latitude !== INITAL_LATITUDE && refetch();
  }, [geolocation]);

  return { data };
};

export default useThemesByGeolocationQuery;
