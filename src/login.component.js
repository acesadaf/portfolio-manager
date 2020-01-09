import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.email);
    const { email, password } = this.state;
    axios.post("/", { email, password }).then(res => {
      console.log(res);
      console.log(res.data);
    });

    if (email === "A@A" && password === "B") {
      localStorage.setItem("token", "Green");
      this.setState({ loggedIn: true });
    }

    event.preventDefault();
  }

  handleChange(event) {
    console.log("im here");
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.type;
    this.setState({
      [name]: value
    });
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/MainMenu" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    );
  }
}
