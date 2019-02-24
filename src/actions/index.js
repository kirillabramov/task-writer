import axios from 'axios';
import { FETCH_TASK_ERROR, FETCH_TASK_LOADING, FETCH_TASK_SUCCESS } from '../reducers/action-types';

const ROOT_URL = 'https://uxcandy.com/~shapoval/test-task-backend';

const taskError = () => {
  return {
    type: FETCH_TASK_ERROR
  };
};

const taskSuccess = (tasks, numberOfPage) => {
  return {
    type: FETCH_TASK_SUCCESS,
    payload: { tasks, numberOfPage }
  };
};

const taskLoading = () => {
  return {
    type: FETCH_TASK_LOADING
  };
};

const fetchTasks = dispatch => (numberOfPage = 1, sortField = null, sortDirection = null) => {
  axios(
    `${ROOT_URL}/?developer=Kirill&page=${numberOfPage}&sort_field=${sortField}&sort_direction=${sortDirection}`
  )
    .then(res => {
      dispatch(taskLoading());
      return res;
    })
    .then(res => dispatch(taskSuccess(res.data.message, numberOfPage)))
    .catch(err => dispatch(taskError()));
};

const sendTask = dispatch => task => {
  const { name, email, text } = task;
  const data = new FormData();
  data.append('username', name);
  data.append('email', email);
  data.append('text', text);

  axios.post(`${ROOT_URL}/create/?developer=Kirill`, data).then(res => {
    dispatch(taskLoading());
    console.log(res);
    return res;
  });
  dispatch(fetchTasks(dispatch));
};

export { fetchTasks, sendTask };
