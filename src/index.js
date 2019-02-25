import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers/task-reducer';
import App from './components/app';

const rootReducer = combineReducers({
  task: taskReducer,
  form: formReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
