import {
  FETCH_TASK_ERROR,
  FETCH_TASK_SUCCESS,
  FETCH_TASK_LOADING,
  HANDLE_LOGIN
} from './action-types';

const initialState = {
  tasks: [],
  loading: true,
  error: false,
  isLogged: false
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
    case HANDLE_LOGIN:
      return {
        ...state,
        isLogged: true
      };
    default:
      return state;
  }
};

export default taskReducer;
