import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Profile from './components/Profile';
import reducer from './reducers';
import moment from 'moment';

moment.locale('pt-br');
const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, middleware);

render(
  <Provider store={store}>
    <Profile/>
  </Provider>,

  document.getElementById('app')
);
