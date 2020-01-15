import Logo from "./iconfinder_briefcase_1608586.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

class deleteStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stocks: [
        {
          Ticker: "PlaceHolder Ticker",
          Company: "PC Company",
          Qty: 500,
          currentPrice: 0,
          percentChange: 0,
          id: 0,
          purchasePrice: 0,
          purchaseDate: new Date()
        }
      ],
      refreshCount: 0
    };
    var selected = 0;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.fetchStocks = this.fetchStocks.bind(this);
  }
  //handleSubmit(event) {}
  handleChange(event) {}
  handleOnSelect = (row, isSelect) => {
    console.log("hereee");
    console.log(isSelect);
    console.log(row.id);
    this.selected = row.id;
    // if (isSelect) {
    //   this.setState(() => ({
    //     selected: [...this.state.selected, row.id]
    //   }));
    // } else {
    //   this.setState(() => ({
    //     selected: this.state.selected.filter(x => x !== row.id)
    //   }));
    // }

    console.log(this.selected);
  };
  fetchStocks() {
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
            percentChange:
              ((data[i].currentPrice - data[i].purchasePrice) /
                data[i].purchasePrice) *
              100,
            id: i,
            purchasePrice: data[i].purchasePrice,
            purchaseDate: data[i].purchaseDate
          };
          //console.log(data[i].companyName);
          //console.log(data[i].currentPrice);
          console.log(data);
          console.log(x[i].purchaseDate);
        }
        this.setState({ stocks: x });
      });
    console.log(this.state.stocks);
  }

  handleSubmit(event) {
    const { Ticker, Qty, purchasePrice, purchaseDate } = this.state.stocks[
      this.selected
    ];
    const stockData = {
      ticker: Ticker,
      userId: 2,
      purchasePrice: purchasePrice,
      quantity: Qty,
      purchaseDate: purchaseDate
    };
    const delMethod = {
      mode: "cors",
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(stockData)
    };
    //const proxyurl = "https://cors-anywhere.herokuapp.com/";
    console.log(delMethod);
    const finalUrl = "https://localhost:44340/api/stocks/";
    fetch(finalUrl, delMethod).then(response => {
      this.fetchStocks();
    });
    // .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    // .catch(err => console.log(err));
    //this.setState({ refreshCount: this.state.refreshCount + 1 });
  }

  componentWillMount() {
    this.fetchStocks();
  }
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
        <h1> Select stocks to delete!</h1>
        <BootstrapTable
          keyField="id"
          data={this.state.stocks}
          columns={[
            {
              dataField: "id",
              text: "ID"
            },
            {
              dataField: "Ticker",
              text: "Ticker"
            },
            {
              dataField: "Company",
              text: "Company"
            },
            {
              dataField: "Qty",
              text: "Quantity"
            },
            {
              dataField: "currentPrice",
              text: "Current Price"
            },
            {
              dataField: "percentChange",
              text: "Percentage Change"
            }
          ]}
          selectRow={{
            mode: "radio",
            clickToSelect: true,
            onSelect: this.handleOnSelect
          }}
        />
        <button
          //style={{ backgroundColor: "101357" }}
          type="submit"
          className="btn btn-primary btn-block"
          onClick={this.handleSubmit}
        >
          Delete!
        </button>
      </div>
    );
  }
}

export default deleteStock;
