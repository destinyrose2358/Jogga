import React from "react";
import {
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import Map from "./Map";
import RouteBuilderForm from "./RouteBuilderForm";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;

class MapOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: [],
      center: { lat: 37.799280, lng: -122.401140 },
      selectedIdx: null,
      directions: {},
      modalOpen: false
    };

    this.addPosition = this.addPosition.bind(this);
    this.removePosition = this.removePosition.bind(this);
    this.selectPosition = this.selectPosition.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    if (this.state.positions.length !== prevState.positions.length) {

      const directionsService = new window.google.maps.DirectionsService();

      const { positions } = this.state;

      const origin = positions[0];
      const destination = positions[positions.length - 1];
      const waypoints = positions.slice(1, positions.length - 1).map(position => {
        return {
          location: position,
          stopover: false
        };
      })

      directionsService.route(
        {
          origin,
          destination,
          waypoints: waypoints,
          travelMode: window.google.maps.TravelMode.WALKING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const positionsData = result.routes[0].legs[0];
            const startPoint = {
              lat: positionsData.start_location.lat(),
              lng: positionsData.start_location.lng()
            };
            const newWayPoints = positionsData.via_waypoints.map(newWayPoint => {
              return {
                lat: newWayPoint.lat(),
                lng: newWayPoint.lng()
              };
            });
            const endPoint = {
              lat: positionsData.end_location.lat(),
              lng: positionsData.end_location.lng()
            };
            if ((startPoint.lat !== endPoint.lat) || (startPoint.lng !== endPoint.lng)) {
              this.setState({
                directions: result,
                positions: [startPoint, ...newWayPoints, endPoint]
              });
            } else {
              this.setState({
                directions: result,
                positions: [startPoint, ...newWayPoints]
              });
            }
            
          } else {
            console.error(`error fetching directions`, result);
          }
        }
      );
    }
  }

  addPosition() {
    return (e) => {
      if (this.state.positions.length < 26) {
        let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng()};
        this.setState(prevState => ({
          positions: [...prevState.positions, newPosition],
          selectedIdx: null
        }));
      } else {
        this.setState({
          message: "You have used the max number of positions"
        })
      }
    }
  }

  removePosition(index) {
    this.setState(prevState => {
      let newPositions = Object.assign([], prevState.positions);
      newPositions.splice(index, 1);
      return {
        positions: newPositions,
        selectedIdx: null,
        message: newPositions.length < 26 ? "" : "You have used the max number of positions"
      }
    });
  }

  selectPosition(idx) {

    this.setState({
      selectedIdx: idx
    })
  }

  closeModal() {
    this.setState(prevState => ({
      modalOpen: false
    }))
  }

  render() {
    return (
      <div className="route-builder">
        <nav>
          <button
            onClick={e => {
              this.setState({
                modalOpen: true
              });
            }}
          >
            Save
          </button>
          { this.state.modalOpen && (
            <>
              <div
                className="modal"
                onClick={e => {
                  this.setState({
                    modalOpen: false
                  })
                }}
              >
              </div>
              <RouteBuilderForm
                closeModal={ this.closeModal }
                positions={this.state.positions}
              />
            </>
          )}
        </nav>
        <Map
          center={this.state.center}
          positions={this.state.positions}
          addPosition={this.addPosition()}
          removePosition={this.removePosition}
          selectedIdx={this.state.selectedIdx}
          selectPosition={this.selectPosition}
          directions={this.state.directions}
        />
      </div>
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