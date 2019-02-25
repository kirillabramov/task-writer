import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Wrapper } from './form';
import { fetchTasks } from '../actions';

class Tasks extends Component {
  static get propTypes() {
    return {
      tasks: PropTypes.instanceOf(Object),
      loading: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      fetchTasks: PropTypes.func,
      isLogged: PropTypes.bool.isRequired,
      history: PropTypes.instanceOf(Object)
    };
  }

  isSorted = true;

  componentDidMount() {
    const { fetchTasks } = this.props;
    fetchTasks();
  }

  handlePagination = i => {
    const { fetchTasks } = this.props;
    fetchTasks(i);
  };

  renderPagination = paginationPages => {
    const pages = Array.from({ length: paginationPages }, (v, i) => (
      <Button
        onClick={() => {
          this.handlePagination(i + 1);
        }}
        key={i}
      >
        {i + 1}
      </Button>
    ));

    return pages;
  };

  renderRow = item => {
    const { id, username, email, status, text } = item;
    const { isLogged, history } = this.props;
    return (
      <TableTR
        key={id}
        style={{
          backgroundColor: status === 10 ? 'lightgreen' : '#eee'
        }}
      >
        <TableTD>{id}</TableTD>
        <TableTD>{username}</TableTD>
        <TableTD>{email}</TableTD>
        <TableTD>{status}</TableTD>
        <TableTD>{text}</TableTD>
        {isLogged ? (
          <TableTD>
            <TableButton
              className="btn btn-outline-warning btn-small"
              onClick={() => {
                history.push(`/edit/${id}`);
              }}
            >
              <TableButtonIcon className="fa fa-edit" />
            </TableButton>
          </TableTD>
        ) : null}
      </TableTR>
    );
  };

  sorting = field => {
    const { fetchTasks } = this.props;
    if (this.isSorted) {
      fetchTasks(1, field, 'asc');
      this.isSorted = false;
    } else {
      fetchTasks(1, field, 'desc');
      this.isSorted = true;
    }
  };

  render() {
    const {
      tasks: { tasks },
      loading,
      error,
      isLogged
    } = this.props;

    if (error) return <Wrapper>Error</Wrapper>;

    return loading ? (
      <Wrapper>loading...</Wrapper>
    ) : (
      <Wrapper>
        <TableTitle>Tasks</TableTitle>
        <Table className="table">
          <TableHead>
            <TableTR>
              <TableTH>#</TableTH>
              <TableTH
                onClick={() => {
                  this.sorting('username');
                }}
              >
                Username
              </TableTH>
              <TableTH
                onClick={() => {
                  this.sorting('email');
                }}
              >
                Email
              </TableTH>
              <TableTH
                onClick={() => {
                  this.sorting('status');
                }}
              >
                Status
              </TableTH>
              <TableTH>Text</TableTH>
              {isLogged ? <TableTH>Action</TableTH> : null}
            </TableTR>
          </TableHead>
          <TableBody>{tasks.tasks.map(this.renderRow)}</TableBody>
        </Table>
        <Pagination>{this.renderPagination(Math.ceil(tasks.total_task_count / 3))}</Pagination>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ task: { tasks, loading, error, isLogged } }) => {
  return { tasks, loading, error, isLogged };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: fetchTasks(dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Tasks)
);

Tasks.defaultProps = {
  tasks: {},
  fetchTasks: () => {},
  history: {}
};

const Button = styled.button``;
const Pagination = styled.div``;
const TableTitle = styled.h2``;

const Table = styled.table``;
const TableHead = styled.thead``;
const TableTH = styled.th`
  cursor: pointer;
  &:hover {
    color: rgba(0, 0, 0, 0.5);
  }
`;
const TableBody = styled.tbody``;
const TableTR = styled.tr``;
const TableTD = styled.td``;
const TableButton = styled.button`
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
`;
const TableButtonIcon = styled.i``;
