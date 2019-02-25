import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Wrapper, TaskForm, Button } from './form';
import { handleLogin } from '../actions';

class Login extends Component {
  static get propTypes() {
    return {
      form: PropTypes.instanceOf(Object),
      handleLogin: PropTypes.func,
      isLogged: PropTypes.bool.isRequired
    };
  }

  handleSend = e => {
    e.preventDefault();
    const {
      form: { loginForm },
      handleLogin
    } = this.props;
    if (loginForm.values.login === 'admin' && loginForm.values.pass === '123') {
      handleLogin();
    }
  };

  render() {
    const { isLogged } = this.props;
    if (isLogged) return <Redirect to="/" />;
    return (
      <Wrapper>
        <Link to="/">Home</Link>

        <TaskForm onSubmit={this.handleSend}>
          <Field name="login" component="input" type="text" placeholder="Login" required />

          <Field name="pass" component="input" type="password" placeholder="Password" required />

          <Button type="submit">Send</Button>
        </TaskForm>
      </Wrapper>
    );
  }
}

Login.defaultProps = {
  form: {},
  handleLogin: () => {}
};

const mapStateToProps = ({ task: { isLogged }, form }) => {
  return { isLogged, form };
};

export default compose(
  reduxForm({ form: 'loginForm' }),
  connect(
    mapStateToProps,
    { handleLogin }
  )
)(Login);
