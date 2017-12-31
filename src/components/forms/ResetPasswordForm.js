import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import lodash from 'lodash';

import InlineError from '../messages/InlineError';

class ResetPasswordForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        token: this.props.token,
        password: '',
        passwordConfirmation: ''
      },
      loading: false,
      errors: {}
    };
  }

  onChange = (e) => this.setState({
    ...this.state,
    data: {...this.state.data, [e.target.name]: e.target.value}
  });

  onSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (lodash.isEmpty(errors)) {
      this.setState({
        loading: true
      });
      this.props.submit(this.state.data)
      .catch((err) => {
          return this.setState({
            errors: err.response.data.errors,
            loading: false
          });
      });
    }
  };

  validate = data => {
    const errors = {};
    if (!data.password) {
      errors.password = "Can't be blank";
    }
    if (data.password !== data.passwordConfirmation) {
      errors.password = "Password must match";
    }
    return errors;
  };

  render() {

    const { errors, data, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">New Password</label>
          <input type="password" id="password" name="password"
            placeholder="your new password" value={data.password} onChange={this.onChange} />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Form.Field error={!!errors.passwordConfirmation}>
          <label htmlFor="passwordConfirmation">Password Confirmation</label>
          <input type="password" id="passwordConfirmation" name="passwordConfirmation"
            placeholder="type it again please" value={data.passwordConfirmation} onChange={this.onChange} />
          {errors.passwordConfirmation && <InlineError text={errors.passwordConfirmation} />}
        </Form.Field>
        <Button primary>Reset</Button>
      </Form>

    );
  }
}

ResetPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

export default ResetPasswordForm;
