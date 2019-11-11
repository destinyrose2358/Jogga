import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import { usePosition } from "../util/usePosition";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;

const Map = (props) => {
  const [directions, setDirections] = useState([]);
  const [positions, setPositions] = useState([]);

  const { lat, lng } = usePosition();

  const NewMap = withGoogleMap(props => (
    <GoogleMap 
      defaultCenter={{ lat, lng }}
      defaultZoom={13}
    >
      <DirectionsRenderer
        directions={directions}
      />
    </GoogleMap>
  ));

  return (
    <div>
      <NewMap
        containerElement={<div style={{ height: "500px", width: "500px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
    
  );
};

const LoadedMap = () => {
  const MapLoader = withScriptjs(Map);

  return (
    <MapLoader 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default LoadedMap;