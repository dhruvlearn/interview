import React from "react";
import { Navbar, Button } from "react-bootstrap";

import "./topNavBar.css";
import { useAuthDispatch } from "../../context/context";
import { logout as logoutUser } from "../../context/actions";
import { BoxArrowLeft } from "react-bootstrap-icons";

export const TopNavBar = () => {
  const dispatch: any = useAuthDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar
      className="shadow-sm top-nav-bar d-flex justify-content-between m"
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand className="ms-3">
        <div className="text-white">Home</div>
      </Navbar.Brand>
      <Button
        onClick={() => logout()}
        variant="primary"
        className="float-right"
      >
        <BoxArrowLeft color="white" size="30" />
      </Button>
    </Navbar>
  );
};
