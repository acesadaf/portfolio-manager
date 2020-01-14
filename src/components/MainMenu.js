import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import "./MainMenuStyle.css";
import Logo from "./iconfinder_briefcase_1608586.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class MainMenu extends Component {
  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    console.log(token);
    let loggedIn = true;
    if (token !== "Green") {
      loggedIn = false;
    }

    this.state = {
      loggedIn: loggedIn,
      ad: "",
      stocks: [
        { Ticker: "PlaceHolder Ticker", Company: "PC Company", Qty: 500 }
      ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderStockTable = this.renderStockTable.bind(this);
  }

  componentDidMount() {
    const someData = {
      ticker: "AMZN",
      userId: 2,
      purchasePrice: 77.4,
      quantity: 205,
      purchaseDate: "2020-05-05T08:13:55"
    };
    const putMethod = {
      mode: "cors",
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(someData)
    };
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    console.log(putMethod);
    const url = "https://localhost:44340/api/stocks/AMZN";
    fetch(url, putMethod)
      .then(response => response.json())
      .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
      .catch(err => console.log(err));

    fetch("https://localhost:44340/api/stocks/", { mode: "cors" })
      .then(results => {
        return results.json();
      })
      .then(data => {
        let x = [];
        var i;
        for (i = 0; i < data.length; i++) {
          x[i] = {
            Ticker: data[i].ticker,
            Company: "hey" + i.toString(),
            Qty: data[i].quantity
          };
        }
        x[1] = {
          Ticker: "goog",
          Company: "hey1",
          Qty: 2000
        };
        this.setState({ stocks: x });
      });
  }

  // componentDidMount() {

  // }

  handleSubmit(event) {
    console.log("clicked!");

    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
    console.log(this.props.location.state.id);
  }
  renderStockTable() {
    return this.state.stocks.map(stock => {
      const { Ticker, Company, Qty } = stock;
      return (
        <tr key={Ticker}>
          <td>{Ticker}</td>
          <td>{Company}</td>
          <td>{Qty}</td>
        </tr>
      );
    });
  }
  renderStockTableHeader() {
    let header = Object.keys(this.state.stocks[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
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
              style={{ color: "white" }}
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
                  <Link className="nav-link" to={"/MainMenu"}>
                    Main Menu
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <h1>My Stocks</h1>
        <h1 id="stock-table-title">All Stocks</h1>
        <table id="stocks">
          <tbody>
            <tr>{this.renderStockTableHeader()}</tr>
            {this.renderStockTable()}
          </tbody>
        </table>
        <button
          onClick={this.handleSubmit}
          className="btn btn-primary btn-block"
          style={({ backgroundColor: "#feda6a" }, { focus: 0 })}

          //overrides={{ backgroundColor: "" }}
        >
          Logout
        </button>
      </div>
    );
  }
}

export default MainMenu;
