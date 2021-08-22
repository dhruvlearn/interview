import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { TopNavBar } from "../../components/TopNavBar";
import { useAuthState } from "../../context/context";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAllowed: boolean;
  restrictedPath: string;
}

export default function PrivateRoute(props: any) {
  const { component: RouteComponent, ...rest } = props;
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
}
