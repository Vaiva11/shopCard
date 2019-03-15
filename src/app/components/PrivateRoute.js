import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function PrivateRoute({ isLogged, path, ...props }) {
  if (!isLogged) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { intendedLocation: path },
        }}
      />
    );
  }

  return <Route path={path} {...props} />;
}

function mapStateToProps(state) {
  return {
    isLogged: !!state.auth.token,
  };
}

PrivateRoute.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(PrivateRoute);
