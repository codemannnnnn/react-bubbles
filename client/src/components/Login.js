import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/api/login", this.state.credentials)
      .then((res) => {
        // res.data.payload
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/protected");
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <div className="login-page">
          <h1>Welcome to the Bubble App!</h1>

          <form id="login-form" onSubmit={this.login}>
            <label>
              Username
              <input
                type="text"
                name="username"
                value={this.state.credentials.username}
                onChange={this.handleChange}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                name="password"
                value={this.state.credentials.password}
                onChange={this.handleChange}
              />
            </label>
            <button>Log in</button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
