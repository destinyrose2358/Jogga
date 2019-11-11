import { useState, useEffect } from "react";

export const usePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);
  
  const onChange = ({ coords }) => {
    setPosition({
      lat: coords.latitude,
      lng: coords.longitude
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geolocation = navigator.geolocation;

    if (!geolocation) {
      setError("Location is not supported");
      return;
    }

    const watcher = geolocation.watchPosition(onChange, onError);

    return () => geolocation.clearWatch(watcher);
  }, []);

  return {...position, error};
};