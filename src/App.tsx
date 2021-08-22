import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import { AuthProvider } from "./context/context";
import PrivateRoute from "./routes/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="main-container">
          <PrivateRoute exact path="/home" component={HomePage} />
          <Route exact path="/" component={LoginPage} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
