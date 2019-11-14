import React, { useState } from "react";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import { usePosition } from "../../util/usePosition";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;

const Markers = ({positions}) => {
  return positions.map((position, idx) => {
    return <Marker key={idx} position={position} />
  });
}

const Map = (props) => {
  const [directions, setDirections] = useState([]);
  const [positions, setPositions] = useState([]);

  const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });
  const refs = {
    map: undefined
  };

  const NewMap = withGoogleMap(props => {
    return (
    <GoogleMap
      center={{ lat: 0, lng: 0 }}
      ref={ref => {refs.map = ref}}
      
      zoom={15}
      onClick={e => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        setPositions([...positions, {lat, lng}]);
      }}
      
      options={{
        streetViewControl: false,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#444444"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#46bcec"
              },
              {
                "visibility": "on"
              }
            ]
          }
        ]
      }}
    >
      <DirectionsRenderer
        directions={directions}
      />
      <Markers positions={positions} />
    </GoogleMap>
  )});

  return (
    <div>
      <NewMap
        containerElement={<div style={{ height: "100vh", width: "100vw" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
    
  );
};

const LoadedMap = () => {
  const { lat, lng } = usePosition();
  const MapLoader = withScriptjs(() => <Map lat={lat} lng={lng} />);

  return (
    <MapLoader 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
    />
  )
}

export default LoadedMap;