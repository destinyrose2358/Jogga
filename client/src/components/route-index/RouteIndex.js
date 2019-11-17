import React, { useState } from "react";
import { Query } from "react-apollo";
import { FETCH_CURRENT_USER_ROUTES } from "../../graphql/queries";
import { Link } from "react-router-dom";
import RouteItemWithMap from "./RouteItem";
import "../../stylesheets/components/RouteIndex.scss";

export default class RouteIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      travelMode: "WALKING"
    };
  }

  render() {
    return (
      <Query
        query={FETCH_CURRENT_USER_ROUTES}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading";
          if (error) return `Error ${error.message}`;

          const { travelMode } = this.state;

          const routes = data.currentUserRoutes;
          const runRouteItems = [];
          const bikingRouteItems = [];
          routes.forEach(route => {
            const newRouteItem = <RouteItemWithMap key={route._id} route={route} />;
            route.travelMode === "WALKING" ? runRouteItems.push(newRouteItem) : bikingRouteItems.push(newRouteItem)
          });

          return (
            <div
              className="route-index-container"
            >
              <h1>My Routes</h1>
              <Link to="/routes/new">Create New Route</Link>

              <div
                className="route-index-controls"
              >
                <button
                  onClick={() => {
                    this.setState({
                      travelMode: "BICYCLING"
                    });
                  }}
                  className={ travelMode === "BICYCLING" ? "selected" : ""}
                >
                  Cycling
                </button>
                <button
                  onClick={() => {
                    this.setState({
                      travelMode: "WALKING"
                    });
                  }}
                  className={travelMode === "WALKING" ? "selected" : ""}
                >
                  Running
                </button>
              </div>
              
              <div
                className={`route-index ${this.state.travelMode === "WALKING" ?
                "" : "hidden"}`}
              >
                {runRouteItems}
              </div>
              <div
                className={`route-index ${this.state.travelMode === "BICYCLING" ?
                "" : "hidden"}`}
              >
                { bikingRouteItems }
              </div>
            </div>
          )
        }}
      </Query>
    );
  } 
}