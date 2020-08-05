import React, { Component } from "react";
import "../App.css";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { withCookies } from "react-cookie";

class Home extends Component {
  state = {
    isLoading: true,
    isAuthenticated: false,
    user: undefined,
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state.csrfToken = cookies.get("XSRF-TOKEN");
    this.login = this.login.bind(this);
  }

  async componentDidMount() {
    const response = await fetch("/api/authenticate", {
      credentials: "include",
    });
    const body = await response.text();
    if (body === "") {
      this.setState({ isAuthenticated: false });
    } else {
      this.setState({
        isAuthenticated: true,
        user: JSON.parse(body),
      });
    }
  }

  login() {
    let port = window.location.port ? ":" + window.location.port : "";
    if (port === ":3000") {
      port = ":8080";
    }
    window.location.href = "//" + window.location.hostname + port + "/private";
  }

  render() {
    const message = this.state.user ? (
      <h2>Welcome, {this.state.user.name}!</h2>
    ) : (
      <p>Please log in to manage your JUG Tour.</p>
    );

    const button = this.state.isAuthenticated ? (
      <div>
        <Button color="link">
          <Link to="/groups">Manage JUG Tour</Link>
        </Button>
        <br />
        <Button color="link" onClick={this.logout}>
          Logout
        </Button>
      </div>
    ) : (
      <Button color="primary" onClick={this.login}>
        Login
      </Button>
    );

    return (
      <div>
        <NavBar />
        <Container fluid>
          {message}
          {button}
        </Container>
      </div>
    );
  }
}

export default withCookies(Home);
