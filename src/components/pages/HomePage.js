import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class HomePage extends Component {
  render() {
    const isAuthenticated = this.props.isAuthenticated;
    const logout = this.props.logout;
    return (
      <div>
        <h1>Home Page</h1>
        { isAuthenticated ? <Button primary onClick={logout}>Logout</Button> : <Link to="/login">Login</Link> }
      </div>

    );
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout })(HomePage);
