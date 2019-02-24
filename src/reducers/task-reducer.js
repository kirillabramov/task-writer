import { FETCH_TASK_ERROR, FETCH_TASK_SUCCESS, FETCH_TASK_LOADING } from './action-types';

const initialState = {
  tasks: [],
  loading: true,
  error: false,
  name: '',
  email: '',
  text: ''
};

const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TASK_LOADING:
      return {
        ...state,
        error: false,
        loading: true
      };
    case FETCH_TASK_SUCCESS:
      return {
        ...state,
        tasks: payload,
        error: false,
        loading: false
      };
    case FETCH_TASK_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};

export default taskReducer;
