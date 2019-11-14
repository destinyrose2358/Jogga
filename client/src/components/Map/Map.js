import React from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  Marker
} from "react-google-maps";
import DynamicMarkers from "./DynamicMarkers";

const Map = ({ positions, center, addPosition, removePosition, selectPosition, selectedIdx, directions }) => {
  return (
    <GoogleMap
      center={center}
      zoom={15}
      onClick={addPosition}
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
        options={{
          suppressMarkers: true,
          preserveViewport: true
        }}
      />
      <DynamicMarkers
        positions={positions}
        removePosition={removePosition}
        selectPosition={selectPosition}
        selectedIdx={selectedIdx}  
      />
    </GoogleMap>
  )
};

export default Map;
