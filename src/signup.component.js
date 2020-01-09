import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.email);
    event.preventDefault();
  }

  handleChange(event) {
    console.log("im here");
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            name="firstName"
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <a href="#">sign in?</a>
        </p>
      </form>
    );
  }
}
