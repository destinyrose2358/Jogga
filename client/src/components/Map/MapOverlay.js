import React from "react";
import {
  withScriptjs,
  withGoogleMap
} from "react-google-maps";
import { withRouter} from "react-router-dom";
import Map from "./Map";
import RouteBuilderForm from "./RouteBuilderForm";
import svgs from "../svgs/svgs";
import History from "../../util/route_history_util";

const googleKey = process.env.REACT_APP_GOOGLE_KEY;



class MapOverlay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: [],
      history: new History(),
      center: { lat: 37.799280, lng: -122.401140 },
      selectedIdx: null,
      directions: null,
      modalOpen: false,
      travelMode: "WALKING"
    };

    this.addPosition = this.addPosition.bind(this);
    this.removePosition = this.removePosition.bind(this);
    this.selectPosition = this.selectPosition.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.setTravelMode = this.setTravelMode.bind(this);
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

  setTravelMode(mode) {
    this.setState({
      travelMode: mode
    })
  }

  componentDidUpdate(_, prevState) {
    if (
      (this.state.positions.length !== prevState.positions.length) 
      || (this.state.travelMode !== prevState.travelMode)
    ) {

      if (!this.state.positions.length){
        this.setState({
          directions: null
        });
      } else {
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
            waypoints,
            travelMode: this.state.travelMode
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
              
            } else if (status === window.google.maps.DirectionsStatus.ZERO_RESULTS) {
              this.setState(prevState => ({
                positions: prevState.positions.slice(0, prevState.positions.length - 1)
              }), () => alert("Sorry, the route you requested doesn't exist"));
            } else {
              console.error(`error fetching directions`, result);
            }
          }
        );
      }
    }

      
  }

  addPosition() {
    return (e) => {
      if (this.state.positions.length < 26) {
        let newPosition = { lat: e.latLng.lat(), lng: e.latLng.lng()};
        this.setState(prevState => ({
          positions: [...prevState.positions, newPosition],
          selectedIdx: null
        }),
        () => this.state.history.save(this.state.positions));
      } else {
        this.setState({
          message: "You have used the max number of positions"
        })
        alert("You have too many waypoints")
      }
    }
  }

  undo() {
    console.log(this.state.history);
    this.state.history.undo();
    this.setState({
      positions: this.state.history.currentNode.positions
    });
  }

  redo() {
    this.state.history.redo();
    this.setState({
      positions: this.state.history.currentNode.positions
    });
  }

  clear() {
    this.setState({
      positions: []
    },
    () => this.state.history.save(this.state.positions));
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
    },
    () => this.state.history.save(this.state.positions));
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
    let saveDisabled = (this.state.positions.length > 1) ? "" : "disabled";
    return (
      <>
        <div>
          <aside className="exit">
            <a onClick={(e) => {
              e.preventDefault();
              this.props.history.goBack();
            }}>Exit Builder</a>
          </aside>
          <aside className="logo">
            <div className="branding" />
            <h2>ROUTE BUILDER</h2>
            <div className="branding small" />
          </aside>
          <aside className="history-controls">
            <button
              className="undo"
              onClick={() => this.undo()}
            >
              {svgs.undo}
              Undo
            </button>
            <button
              className="redo"
              onClick={() => this.redo()}
            >
              {svgs.redo}
              Redo
            </button>
            <button
              className="undo"
              onClick={() => this.clear()}
            >
              {svgs.x}
              Clear
            </button>
          </aside>
          <aside className="travel-mode">
            <button
              className={`walking ${this.state.travelMode === "WALKING" ? "selected" : ""}`}
              onClick={() => {
                this.setTravelMode("WALKING");
              }} 
            >
              { svgs.shoe }
              Run
            </button>
            <button
              className={`biking ${this.state.travelMode === "BICYCLING" ? "selected" : ""}`}
              onClick={() => {
                this.setTravelMode("BICYCLING");
              }}
            >
              { svgs.bike }
              ride
            </button>
          </aside>
          <aside className="save-div">
            <button
              className="save"
              disabled={ saveDisabled }
              onClick={e => {
                this.setState({
                  modalOpen: true
                });
              }}
            >
              Save
            </button>
          </aside>
          

          {this.state.modalOpen && (
            <>
              <div
                className="modal-background"
                onClick={e => {
                  this.setState({
                    modalOpen: false
                  });
                }}
              ></div>
              <RouteBuilderForm
                closeModal={this.closeModal}
                positions={this.state.positions}
                travelMode={this.state.travelMode}
              />
            </>
          )}
        </div>
        <Map
          center={this.state.center}
          positions={this.state.positions}
          addPosition={this.addPosition()}
          removePosition={this.removePosition}
          selectedIdx={this.state.selectedIdx}
          selectPosition={this.selectPosition}
          directions={this.state.directions}
        />
      </>
    );
  }
}

const MapOverlayWithRouter = withRouter(MapOverlay);

const LoadedMap = withScriptjs(
  withGoogleMap(props => (
    <MapOverlayWithRouter />
  ))
);

const RouteBuilderMap = () => {
  return (
    <LoadedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
      loadingElement={<div style={{ height: `100%` }} />}
      mapElement={<div className="route-builder-map" style={{ height: "100%" }} />}
      containerElement={<div className="route-builder-container" />}
      style={{zIndex: 400}}
    />
  )
};

export default RouteBuilderMap;