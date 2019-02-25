import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { sendTask } from '../actions';

class Form extends Component {
  static get propTypes() {
    return {
      sendTask: PropTypes.func,
      form: PropTypes.instanceOf(Object)
    };
  }

  handleSend = e => {
    e.preventDefault();
    const {
      sendTask,
      form: { form }
    } = this.props;
    const task = form.taskForm.values;
    sendTask(task);
  };

  render() {
    return (
      <Wrapper>
        <TaskForm onSubmit={this.handleSend}>
          <Field name="name" component="input" type="text" placeholder="Name" required />
          <Field name="email" component="input" type="email" placeholder="Email" required />
          <Field name="text" component="input" type="text" placeholder="Text" required />
          <Button type="submit">Send</Button>
        </TaskForm>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendTask: sendTask(dispatch)
  };
};

const mapStateToProps = form => {
  return { form };
};

export default compose(
  reduxForm({ form: 'taskForm' }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Form);

Form.defaultProps = {
  sendTask: () => {},
  form: {}
};

export const Wrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction column;
`;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-top: 30px;
`;
export const Button = styled.button``;
