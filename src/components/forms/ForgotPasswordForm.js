import React, { Component } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import Validator from 'validator';
import lodash from 'lodash';

import InlineError from '../messages/InlineError';

class ForgotPasswordForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: ''
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
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email";
    }
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        {!!errors.global && <Message negative>{errors.global}</Message>}
        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="example@example.com" value={data.email} onChange={this.onChange} />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button primary>Send Request</Button>
      </Form>

    );
  }
}

export default ForgotPasswordForm;
