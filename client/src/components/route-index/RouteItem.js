import React from "react";
import { Mutation } from "react-apollo"
import { DELETE_ROUTE } from "../../graphql/mutations";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps";
import { Link } from "react-router-dom";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;

class RouteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: {},
    };
  }

  componentDidMount() {
    const directionsService = new window.google.maps.DirectionsService();

    const { positions, travelMode } = this.props.route;

    const origin = positions[0];
    const destination = positions[positions.length - 1];
    const waypoints = positions.slice(1, positions.length - 1).map(position => {
      return {
        location: position,
        stopover: false
      };
    });

    directionsService.route(
      {
        origin,
        destination,
        waypoints,
        travelMode
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          }, () => console.log(this.state.directions));
        }
      }
    )
  }

  render() {
    if (!this.state.directions.routes) {
      return null;
    }

    const stats = this.state.directions.routes[0].legs[0];
    const { positions, _id } = this.props.route;
    let duration = stats.duration.value;

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60) - 60 * hours;
    const seconds = duration % 60;
    
    return (
      <Mutation
        mutation={DELETE_ROUTE}
      >
        {(deleteRoute, { data }) => {
          return (
            <>
              <GoogleMap
                options={{
                  disableDefaultUI: true,
                  draggable: false,
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
                  directions={this.state.directions}
                  options={{
                    suppressMarkers: true  
                  }}
                />
                  <Marker
                    position={positions[0]}
                  />
                  <Marker
                    position={positions[positions.length - 1]}
                  />
              </GoogleMap>
              <h3>{ this.props.route.name }</h3>
              <div className="stats-inline">
                <p className="distance">
                  <p>{ stats.distance.text }</p>
                  <p>Distance</p>
                </p>
                <p className="duration">
                  <p>{duration >= 60 ? `${hours > 0 ? `${hours}:` : ""}${minutes}:${seconds}` : `${seconds}s`}</p>
                  <p>Est. Moving Time</p>
                </p>
              </div>
              
              <p
                className="date"  
              >Created on {1}</p>
            </> 
          )
        }}
      </Mutation>
    )
  }
}

const LoadedMap = withScriptjs(
  withGoogleMap(props => <RouteItem route={props.route} />)
);

const RouteItemWithMap = props => {
  return (
    <LoadedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${googleKey}`}
      loadingElement={<div style={{ height: "100%" }}/>}
      mapElement={<div className="route-item-map" style={{ height: "100%" }}/>}
      containerElement={<div className="route-item-container" />}
      route={props.route}
    />
  )
}

export default RouteItemWithMap;