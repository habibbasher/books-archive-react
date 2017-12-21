import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';


class DashboardPage extends Component {

  render() {
    const { isConfirmed } = this.props.isConfirmed;
    return (
      <div>
        {!isConfirmed && <ConfirmEmailMessage />}
      </div>
    );
  }

}

DashboardPage.propTypes = {
  isConfirmed: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isConfirmed: !!state.user.confirmed
  };
}


export default connect(mapStateToProps)(DashboardPage);