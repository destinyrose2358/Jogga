import React from "react";
import RouteBuilderMap from "../Map/MapOverlay";
import "../../stylesheets/components/RouteBuilder.scss";

const RouteBuilder = () => {
  return (
    <div className="route-builder">
      <RouteBuilderMap />
    </div>
  )
};

export default RouteBuilder;