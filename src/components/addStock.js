import Logo from "./iconfinder_briefcase_1608586.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import Calendar from "react-calendar";
class addStock extends Component {
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
  handleSubmit(event) {
    const { ticker, quantity, purchasePrice, purchaseDate } = this.state;
    const stockData = {
      ticker: ticker,
      userId: 2,
      purchasePrice: purchasePrice,
      quantity: quantity,
      purchaseDate: purchaseDate
    };
    const putMethod = {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(stockData)
    };
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    console.log(putMethod);
    const url = "https://localhost:44340/api/stocks/";
    const finalUrl = url + ticker;
    fetch(finalUrl, putMethod)
      .then(response => response.json())
      .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log(err));
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  onChange = date => this.setState({ purchaseDate: date });
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
        <form onSubmit={this.handleSubmit}>
          <h3>Enter Stock Info!</h3>

          <div className="form-group">
            <label>Stock Ticker</label>
            <input
              type="text"
              name="ticker"
              className="form-control"
              placeholder="Enter ticker"
              value={this.state.ticker}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Enter number of stocks purchased"
              value={this.state.quantity}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Purchase Price</label>
            <input
              type="number"
              name="purchasePrice"
              className="form-control"
              placeholder="Enter purchase price"
              value={this.state.purchasePrice}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <label>Select the date of purchase</label>
            <Calendar>
              onChange={this.onChange}
              value={this.state.purchaseDate}
            </Calendar>
          </div>

          <button
            //style={{ backgroundColor: "101357" }}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default addStock;
