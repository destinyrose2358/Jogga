import React from "react";
import {
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import Map from "./Map";
import usePosition from "../../util/usePosition";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;

class MapOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: [],
      center: { lat: 37.799280, lng: -122.401140 }
    };

    this.addPosition = this.addPosition.bind(this);
  }

  findLocation() {
    const geolocation = navigator.geolocation;

    if (geolocation) {
      geolocation.getCurrentPosition(({ coords }) => {
        this.setState({
          center: { lat: coords.latitude, lng: coords.longitude }
        })
      })
    }
  }

  componentDidMount() {
    this.findLocation();
  }

  addPosition() {
    return (e) => {
      let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng()};
      this.setState(prevState => ({
        positions: [...prevState.positions, newPosition]
      }));
    }
  }

  render() {
    return (
      <Map
        center={this.state.center}
        positions={this.state.positions}
        addPosition={this.addPosition()}
      />
    )
  }
}

const LoadedMap = withScriptjs(
    withGoogleMap(props => (
      <MapOverlay />
    ))
);

const RouteBuilderMap = () => {
  return (
    <LoadedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: "100%" }} />}
      containerElement={<div style={{ height: "100vh", width: "100vw" }} />}
    />
  )
};

export default RouteBuilderMap;