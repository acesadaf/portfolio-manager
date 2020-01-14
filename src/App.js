import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Logo from "./iconfinder_briefcase_1608586.svg";
import MainMenu from "./components/MainMenu";
import addStock from "./components/addStock";
import deleteStock from "./components/deleteStock";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/MainMenu" component={MainMenu} />
              <Route path="/add-stock" component={addStock} />
              <Route path="/delete-stock" component={deleteStock} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
