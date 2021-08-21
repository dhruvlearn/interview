import React from "react";
import { Route, Redirect } from "react-router-dom";
import { TopNavBar } from "../../components/TopNavBar";
import { useAuthState } from "../../context/context";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user, token } = useAuthState();

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        user && token ? (
          <div>
            <TopNavBar />
            <RouteComponent {...routeProps} />
          </div>
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};

export default PrivateRoute;
