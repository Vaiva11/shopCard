import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./index.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  onLogin = () => {
    const { username, password } = this.state;
    const { history, login, location } = this.props;

    if (username && password) {
      login(username, password);
      history.replace(
        location.state && location.state.intendedLocation
          ? location.state.intendedLocation
          : "/shop"
      );
    }
  };

  render() {
    return (
      <div className="Login">
        <div className="Login--form">
          <input
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Nickname"
          />
          <input
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <button onClick={this.onLogin} type="button">
            Login
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isLogged: !!state.auth.tokken,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch({ type: "LOGIN" }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
