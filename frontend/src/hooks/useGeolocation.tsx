import { HongdaePos, OPTIONS } from '@constants/geolocation';

import { useEffect, useState } from 'react';

const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<
    Pick<GeolocationCoordinates, 'latitude' | 'longitude'>
  >({
    latitude: 0,
    longitude: 0,
  });

  const success = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setGeolocation({ latitude, longitude });
  };

  const error = () => {
    setGeolocation(HongdaePos);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition(success, error, OPTIONS);
  }, []);

  return { geolocation };
};

export default useGeolocation;
