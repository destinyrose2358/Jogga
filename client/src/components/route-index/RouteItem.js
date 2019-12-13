import React from "react";
import { Mutation } from "react-apollo"
import { DELETE_ROUTE } from "../../graphql/mutations";
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from "react-google-maps";
import { Link } from "react-router-dom";
import { FETCH_CURRENT_USER_ROUTES } from "../../graphql/queries";
import svgs from "../svgs/svgs";
import startIconImage from "../../images/start_icon.png";
import endIconImage from "../../images/end_icon.png";
const googleKey = process.env.REACT_APP_GOOGLE_KEY;


class RouteItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: {},
      map: null
    };
    this.fitBounds = this.fitBounds.bind(this);
  }

  componentDidMount() {
    this.requestDirections();
  }

  async requestDirections() {
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
          });
        } else if (status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
          this.requestDirections();
        }
      }
    )
  }

  fitBounds() {
    const bounds = new window.google.maps.LatLngBounds();
    this.props.route.positions.forEach(position => {
      bounds.extend(position)
    });
    this.state.map.fitBounds(bounds);
  }

  render() {
    if (!this.state.directions.routes) {
      return null;
    }

    const stats = this.state.directions.routes[0].legs[0];
    const { positions, _id, date } = this.props.route;
    let duration = stats.duration.value;

    const days = Math.floor(duration / 86400);
    const hours = Math.floor(duration / 3600) - 24 * days;
    const minutes = Math.floor(duration / 60) - 60 * (hours + 24 * days);
    const seconds = duration % 60;

    const dateObj = new Date(date);
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    const startIcon = new window.google.maps.MarkerImage(
      startIconImage,
      null,
      null,
      new window.google.maps.Point(8, 8),
      new window.google.maps.Size(16, 16)
    );

    const endIcon = new window.google.maps.MarkerImage(
      endIconImage,
      null,
      null,
      new window.google.maps.Point(8, 8),
      new window.google.maps.Size(16, 16)
    );
    
    return (
      <Mutation
        mutation={DELETE_ROUTE}
        refetchQueries={() => {
          return [
            {
              query: FETCH_CURRENT_USER_ROUTES
            }
          ]
        }}
      >
        {(deleteRoute, { data }) => {
          return (
            <>
              <GoogleMap
                onTilesLoaded={this.fitBounds}
                ref={map => {
                  if (!this.state.map) {
                    this.setState({
                    map
                  });
                  }
                }}
                center={(this.state.map && this.state.map.getCenter().toJSON()) || { lat: 0, lng: 0}}
                zoom={(this.state.map && this.state.map.getZoom()) || 13}
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
                    icon={startIcon}
                  />
                  <Marker
                    position={positions[positions.length - 1]}
                    icon={endIcon}
                  />
              </GoogleMap>
              <h3>{ this.props.route.name }</h3>
              <div className="stats-inline">
                <p className="distance">
                  <span>{ stats.distance.text }</span>
                  <span>Distance</span>
                </p>
                <p className="duration">
                  <span>
                    {days ? <abbr title="days">{days}d</abbr> : ""}
                    {hours ? <abbr title="hours">{hours}h</abbr> : ""}
                    {minutes ? <abbr title="minutes">{minutes}m</abbr> : ""}
                    {seconds ? <abbr title="seconds">{seconds}s</abbr> : ""}
                  </span>
                  <span>Est. Moving Time</span>
                </p>
              </div>
              <button
                onClick={() => deleteRoute({ variables: { _id: this.props.route._id } })}
              >
                {svgs.trashCan}
              </button>
              <p
                className="date"  
              >Created on {month} {day}, {year}</p>
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