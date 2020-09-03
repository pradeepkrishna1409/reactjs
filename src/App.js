import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./components/pages/Home";
import Visualization from "./components/pages/Visualization";
import Navbar from "./components/layout/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import NotFound from "./components/pages/NotFound";
//import EditUser from "./components/users/EditUser";
//import User from "./components/users/User";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Visualization" component={Visualization} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
