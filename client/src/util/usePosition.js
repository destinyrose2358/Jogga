const usePosition = (setState) => {

  const geolocation = navigator.geolocation;

  if (!geolocation) {
    return { lat: 37.799280, lng: -122.401140 };
  }
  geolocation.getCurrentPosition(({ coords }) => {
    return { lat: coords.latitude, lng: coords.longitude };
  });


};

export default usePosition;