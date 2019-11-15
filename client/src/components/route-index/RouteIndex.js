import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CURRENT_USER_ROUTES } from "../../graphql/queries";
import { Link } from "react-router-dom";
import RouteItem from "./RouteItem";

const RouteIndex = props => {
  const { loading, data } = useQuery(FETCH_CURRENT_USER_ROUTES);
  const [travelType, setTravelType] = useState("WALKING");
  if (loading) return null;

  const bikeRoutes = [];
  const runningRoutes = [];

  data.currentUserRoutes.forEach(route => {
    route.travelMode === "WALKING" ? runningRoutes.push(route) : bikeRoutes.push(route)
  });

  return (
    <div
      className="route-index-container"
    >
      <h1>My Routes</h1>
      <Link to="/routes/new">Create New Route</Link>

      <button
        onClick={() => {
          setTravelType("BICYCLING");
        }}
        className={travelType === "BICYCLING" ? "selected" : ""}
      >
        Cycling
      </button>
      <button
        onClick={() => {
          setTravelType("WALKING");
        }}
        className={travelType === "WALKING" ? "selected" : ""}
      >
        Running
      </button>

      {/* { currentUserRoutes.map(route => {
        return <RouteItem route={route} />
      }) } */}
    </div>
  );
}

export default RouteIndex;