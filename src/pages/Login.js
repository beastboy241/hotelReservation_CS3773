import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import userProfile from "../userProfile";
import "../css/styles.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.option = 1;
    this.state = {
      redirect: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      creds: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmitSignUp(event) {
    if (
      this.state.email.trim() === "" ||
      this.state.password.trim() === "" ||
      this.state.firstName.trim() === "" ||
      this.state.lastName.trim() === "" ||
      this.state.phoneNumber.trim() === ""
    ) {
      alert("Error! Some fields are missing.");
    } else {
      await fetch("login/" + this.state.email)
        .then((res) => res.json())
        .then((creds) => this.setState({ creds }));
      if (this.state.creds !== null) {
        alert("This email is already used. Please try another one!");
      } else {
        await fetch("login/", {
          method: "POST",
          header: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phoneNumber: this.state.phoneNumber,
          }),
        })
          .then((res) => res.json())
          .then((body) => console.log(body));
        this.setState({ redirect: true });
      }
      userProfile.setName(this.state.email);
      userProfile.setSession(true);
      event.preventDefault();
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    //if the inputs are empty
    if (this.state.email === "" || this.state.password === "") {
      alert("Please make sure both email and password are filled out.");
    } else {
      //fetch API to get user credential
      await fetch("login/" + this.state.email)
        .then((res) => res.json())
        .then((creds) => this.setState({ creds }));
      //if the email is not in the database or wrong password
      if (
        this.state.creds === null ||
        this.state.password !== this.state.creds.password
      ) {
        alert("No account under this email.");
      } else {
        //all the credential information is right, redirect to the homepage
        this.setState({ redirect: true });
      }
    }
    userProfile.setName(this.state.email);
    userProfile.setSession(true);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      userProfile.setSession(true);
      userProfile.setName(this.state.email);
      return <Redirect to="/profile" />;
    }
  };

  form() {
    return (
      <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
        <div
          className={
            "account-form-fields " +
            (this.state.option === 1 ? "sign-in" : "sign-up")
          }
        >
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
        </div>
        <button
          className="btn-submit-form"
          type="submit"
          onClick={(e) => this.handleSubmit(e)}
        >
          Sign in
        </button>
        {this.renderRedirect()}
      </form>
    );
  }

  create() {
    return (
      <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
        <div
          className={
            "account-form-fields " +
            (this.state.option === 1 ? "sign-in" : "sign-up")
          }
        >
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
            required
          />
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
            required
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            required
          />
        </div>
        <button
          className="btn-submit-form"
          type="submit"
          onClick={(e) => this.handleSubmitSignUp(e)}
        >
          Sign up
        </button>
        {this.renderRedirect()}
      </form>
    );
  }

  render() {
    return (
      <div className="container">
        <header>
          <div
            className={
              "header-headings " +
              (this.state.option === 1 ? "sign-in" : "sign-up")
            }
          >
            <span>Sign in to your account</span>
            <span>Create an account</span>
          </div>
        </header>
        <ul className="options">
          <li
            className={this.state.option === 1 ? "active" : ""}
            onClick={() => this.setState({ option: 1 })}
          >
            Sign in
          </li>
          <li
            className={this.state.option === 2 ? "active" : ""}
            onClick={() => this.setState({ option: 2 })}
          >
            Sign up
          </li>
        </ul>
        {this.state.option === 1 ? this.form() : this.create()}
      </div>
    );
  }
}

export default Login;
