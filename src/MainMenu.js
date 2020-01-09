import { Redirect } from "react-router-dom";
import React, { Component } from "react";
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
      loggedIn: loggedIn
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    console.log("clicked!");
    localStorage.removeItem("token");
    this.setState({ loggedIn: false });
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>this is an aaa admin page.</h1>
        <button
          onClick={this.handleSubmit}
          className="btn btn-primary btn-block"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default MainMenu;
