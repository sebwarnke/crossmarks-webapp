import React, { Component } from "react";

class AuthenticationPlayground extends Component {
  state = {
    isLoggedIn: false,
    jwt: "",
  };

  async componentDidMount() {
    var body = {
      username: "demo",
      password: "demo",
    };

    const response = await fetch("api/authenticate", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    var payload = await response.text();

    var extractedToken = JSON.parse(payload).jwt;

    if (extractedToken !== null && extractedToken !== "") {
      this.setState({
        jwt: extractedToken,
        isLoggedIn: true,
      });
    }
  }
  render() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <h1>Logged In</h1>
          <h2>{this.state.jwt}</h2>
        </div>
      );
    } else {
      return <h1>Logged Out</h1>;
    }
  }
}

export default AuthenticationPlayground;
