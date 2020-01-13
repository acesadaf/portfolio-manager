import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import "./MainMenuStyle.css";
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
