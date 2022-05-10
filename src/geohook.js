import { useEffect, useState } from 'react';
const geo = navigator.geolocation;
const geoAvailable = 'geolocation' in navigator;

const options = {
  enableHighAccuracy: true
}

export function usePosition({ watch = false }) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!geoAvailable) {
      setError(new Error("Browser kennt geolocation nicht"));
      return;
    }

    const onChange = (p) => {
      console.log("position changed", p);
      console.log("uhr", new Date(p.timestamp))
      setPosition(p);
    }

    const onError = (err) => {
      setError(err);
    }

    if (!watch) {
      geo.getCurrentPosition(onChange, onError, options);
    }

    const watchId = geo.watchPosition(onChange, onError, options);
    return () => geo.clearWatch(watchId);
  }, [setPosition, watch]);


  // {
  //   position,
  //   error,
  //   prompted,
  //   isAllowedToUsePosition,
    // isGeoAvailable => !('geolocation' in navigator)
  // }

  return { position, geoAvailable, error };
}
