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
      center: { lat: 37.799280, lng: -122.401140 },
      selectedIdx: null,
      directions: {}
    };

    this.addPosition = this.addPosition.bind(this);
    this.removePosition = this.removePosition.bind(this);
    this.selectPosition = this.selectPosition.bind(this);
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

  componentDidUpdate(_, prevState) {
    if (this.state.positions !== prevState.positions) {
      const directionsService = new window.google.maps.DirectionsService();

      const { positions } = this.state;

      const origin = positions[0];
      const destination = positions[positions.length - 1];

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }

  addPosition() {
    return (e) => {
      let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng()};
      this.setState(prevState => ({
        positions: [...prevState.positions, newPosition],
        selectedIdx: null
      }));
    }
  }

  removePosition(index) {
    this.setState(prevState => {
      let newPositions = Object.assign([], prevState.positions);
      newPositions.splice(index, 1);
      return {
        positions: newPositions,
        selectedIdx: null
      }
    });
  }

  selectPosition(idx) {

    this.setState({
      selectedIdx: idx
    })
  }

  render() {
    return (
      <Map
        center={this.state.center}
        positions={this.state.positions}
        addPosition={this.addPosition()}
        removePosition={this.removePosition}
        selectedIdx={this.state.selectedIdx}
        selectPosition={this.selectPosition}
        directions={this.state.directions}
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
      mapElement={<div style={{ height: "100%"}} />}
      containerElement={<div style={{ height: "100vh", width: "100vw", position: "absolute" }} />}
    />
  )
};

export default RouteBuilderMap;