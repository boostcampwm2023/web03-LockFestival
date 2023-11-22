const REQUEST_INFO = {
  km: 10,
  themeCount: 10,
};

const OPTIONS = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0,
};

const HongdaePos: Pick<GeolocationCoordinates, 'latitude' | 'longitude'> = {
  longitude: 126.97255197,
  latitude: 37.48158005,
};

export { REQUEST_INFO, OPTIONS, HongdaePos };
