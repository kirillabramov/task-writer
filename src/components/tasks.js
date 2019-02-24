import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Wrapper } from './form';
import { fetchTasks } from '../actions';

class Tasks extends Component {
  static get propTypes() {
    return {
      tasks: PropTypes.instanceOf(Object),
      loading: PropTypes.bool.isRequired,
      error: PropTypes.bool.isRequired,
      fetchTasks: PropTypes.func
    };
  }

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

  renderRow = (item, idx) => {
    const { id, username, status, text } = item;

    return (
      <TableTR key={id}>
        <TableTD>{idx + 1}</TableTD>
        <TableTD>{username}</TableTD>
        <TableTD>{status}</TableTD>
        <TableTD>{text}</TableTD>
        <TableTD>
          <TableButton className="btn btn-outline-success btn-small">
            <TableButtonIcon className="fa fa-plus-circle" />
          </TableButton>
          <TableButton className="btn btn-outline-warning btn-small">
            <TableButtonIcon className="fa fa-minus-circle" />
          </TableButton>
          <TableButton className="btn btn-outline-danger btn-small">
            <TableButtonIcon className="fa fa-trash-o" />
          </TableButton>
        </TableTD>
      </TableTR>
    );
  };

  render() {
    const {
      tasks: { tasks },
      loading,
      error
    } = this.props;

    if (error) return <Wrapper>Error</Wrapper>;
    {
      return loading ? (
        <Wrapper>loading...</Wrapper>
      ) : (
        <Wrapper>
          <TableTitle>Tasks</TableTitle>
          <Table className="table">
            <TableHead>
              <TableTR>
                <TableTH>#</TableTH>
                <TableTH>Username</TableTH>
                <TableTH>Email</TableTH>
                <TableTH>Text</TableTH>
                <TableTH>Action</TableTH>
              </TableTR>
            </TableHead>
            <TableBody>{tasks.tasks.map(this.renderRow)}</TableBody>
          </Table>
          <Pagination>{this.renderPagination(Math.ceil(tasks.total_task_count / 3))}</Pagination>
        </Wrapper>
      );
    }
  }
}

const mapStateToProps = ({ task: { tasks, loading, error } }) => {
  return { tasks, loading, error };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: fetchTasks(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tasks);

Tasks.defaultProps = {
  tasks: {},
  fetchTasks: () => {}
};

const Button = styled.button``;
const Pagination = styled.div``;
const TableTitle = styled.h2``;

const Table = styled.table``;
const TableHead = styled.thead``;
const TableTH = styled.th``;
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
const TableTotal = styled.div`
  font-size: 25px;
  text-align: right;
`;
