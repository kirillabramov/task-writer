import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { editTask } from '../actions';
import { Wrapper, TaskForm, Button } from './form';

class Edit extends Component {
  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      form: PropTypes.instanceOf(Object),
      editTask: PropTypes.func
    };
  }

  handleSend = e => {
    e.preventDefault();
    const {
      id,
      form: { editForm },
      editTask
    } = this.props;
    const task = { id, task: editForm.values };
    editTask(task);
  };

  render() {
    return (
      <Wrapper>
        <Link to="/">Home</Link>

        <TaskForm onSubmit={this.handleSend}>
          <Field name="text" component="input" type="text" placeholder="Text" required />

          <Field name="status" component="input" type="number" placeholder="Status" required />

          <Button type="submit">Send</Button>
        </TaskForm>
      </Wrapper>
    );
  }
}

Edit.defaultProps = {
  form: {},
  editTask: () => {}
};

const mapStateToProps = ({ form }) => {
  return { form };
};

const mapDispatchToProps = dispatch => {
  return {
    editTask: editTask(dispatch)
  };
};

export default withRouter(
  compose(
    reduxForm({ form: 'editForm' }),
    connect(
      mapStateToProps,
      mapDispatchToProps
    )
  )(Edit)
);
