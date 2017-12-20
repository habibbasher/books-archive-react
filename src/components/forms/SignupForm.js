import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';
import Validator from 'validator';
import lodash from 'lodash';


import InlineError from '../messages/InlineError';



class SignupForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      data: {
        email: '',
        password: ''
      },
      loading: false,
      errors: {}
    };
  }

  onChange = (e) => {
    return this.setState({
        data: {...this.state.data, [e.target.name]: e.target.value}
    });
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) {
      errors.email = "Invalid email";
    }
    if(!data.password) {
      errors.password = "Can't be blank";
    }
    return errors;
  };

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

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>

        <Form.Field error={!!errors.email}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="example@example.com" value={data.email} onChange={this.onChange} />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Make it secure" value={data.password} onChange={this.onChange} />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>

        <Button primary>Sign Up</Button>
      </Form>
    );
  }

}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
