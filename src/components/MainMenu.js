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
        {
          Ticker: "PlaceHolder Ticker",
          Company: "PC Company",
          Qty: 500,
          currentPrice: 0,
          percentChange: 0
        }
      ]
      // fetched: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderStockTable = this.renderStockTable.bind(this);
  }

  componentWillMount() {
    // const someData = {
    //   ticker: "AMZN",
    //   userId: 2,
    //   purchasePrice: 77.4,
    //   quantity: 205,
    //   purchaseDate: "2020-05-05T08:13:55"
    // };
    // const putMethod = {
    //   mode: "cors",
    //   method: "PUT",
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8"
    //   },
    //   body: JSON.stringify(someData)
    // };
    // //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    // console.log(putMethod);
    // const url = "https://localhost:44340/api/stocks/AMZN";
    // fetch(url, putMethod)
    //   .then(response => response.json())
    //   .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    //   .catch(err => console.log(err));
    // if (localStorage.getItem("alreadyFetched") === "yes") {
    //   console.log("is heree");
    //   return;
    // }
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
            Company: data[i].companyName,
            Qty: data[i].quantity,
            currentPrice: data[i].currentPrice,
            //purchasePrice: data[i].PurchasePrice,
            percentChange:
              ((data[i].currentPrice - data[i].purchasePrice) /
                data[i].purchasePrice) *
              100
          };
          console.log(data[i].companyName);
          console.log(data[i].currentPrice);
          console.log(data);
        }
        this.setState({ stocks: x });
      });
    // this.fetched = true;
    // localStorage.setItem("alreadyFetched", "yes");
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
    // if (this.fetched === false) return;
    return this.state.stocks.map(stock => {
      const { Ticker, Company, Qty, currentPrice, percentChange } = stock;
      return (
        <tr key={Ticker}>
          <td>{Ticker}</td>
          <td>{Company}</td>
          <td>{Qty}</td>
          <td>{currentPrice}</td>
          <td>{percentChange}</td>
        </tr>
      );
    });
  }
  renderStockTableHeader() {
    // if (this.fetched === false) {
    //   return <th>Stocks Loading..</th>;
    // }
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
