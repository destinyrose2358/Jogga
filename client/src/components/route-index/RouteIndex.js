import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_CURRENT_USER_ROUTES } from "../../graphql/queries";
import { DELETE_ROUTE } from "../../graphql/mutations";

const RouteIndex = props => {
  const { loading, data } = useQuery(FETCH_CURRENT_USER_ROUTES);
  if (loading) return null;
  console.log(data);

  return (
    <div
      className="route-index-container"
    >

    </div>
  );
}

export default RouteIndex;