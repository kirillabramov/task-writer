import axios from 'axios';
import { reset } from 'redux-form';
import md5 from 'md5';
import {
  FETCH_TASK_ERROR,
  FETCH_TASK_LOADING,
  FETCH_TASK_SUCCESS,
  HANDLE_LOGIN
} from '../reducers/action-types';

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

const handleLogin = () => {
  return {
    type: HANDLE_LOGIN
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

const editTask = dispatch => task => {
  const { text, status } = task.task;
  const encodeText = encodeURI(text);
  const encodeStatus = encodeURI(status);
  const token = 'beejee';
  const signature = md5(`status=${encodeStatus}&text=${encodeText}&token=${token}`);
  const data = new FormData();
  data.append('text', text);
  data.append('status', status);
  data.append('token', token);
  data.append('signature', signature);
  axios.post(`${ROOT_URL}/edit/${task.id}/?developer=Kirill`, data).then(res => {
    console.log(res);
    return res;
  });

  // encodeURI;
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
  dispatch(reset('taskForm'));
  dispatch(fetchTasks(dispatch));
};

export { fetchTasks, sendTask, handleLogin, editTask };
