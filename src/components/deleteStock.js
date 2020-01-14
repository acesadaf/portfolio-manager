import Logo from "./iconfinder_briefcase_1608586.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";

class deleteStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: "",
      quantity: 0,
      purchasePrice: 0,
      purchaseDate: new Date()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {}
  handleChange(event) {}
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={Logo} width="30" height="30" alt="cant find"></img>
            </a>
            <Link
              className="navbar-brand"
              to={"/sign-in"}
              style={{ color: "black" }}
            >
              Portfolio Manager
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/add-stock"}>
                    Add Stock
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/delete-stock"}>
                    Delete Stock
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/MainMenu"}>
                    Main Menu
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default deleteStock;
