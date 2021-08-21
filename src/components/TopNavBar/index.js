import React from "react";
import { Navbar, Button } from "react-bootstrap";

import "./topNavBar.css";
import { Link } from "react-router-dom";
import { useAuthDispatch } from "../../context/context";

export const TopNavBar = () => {
  const dispatch = useAuthDispatch();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <Navbar
      className="shadow-sm top-nav-bar d-flex justify-content-between m"
      bg="primary"
      variant="dark"
    >
      <Navbar.Brand className="ms-3">
        <Link className="text-white">Home</Link>
      </Navbar.Brand>
      <Button
        onClick={() => logout()}
        variant="primary"
        className="float-right"
      >
        Logout
      </Button>
    </Navbar>
  );
};
