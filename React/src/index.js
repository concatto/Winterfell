import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import ProfileContainer from './containers/ProfileContainer';
import SearchContainer from './containers/SearchContainer';
import NavigationBarContainer from './containers/SearchContainer';
import reducer from './reducers';
import moment from 'moment';
import { loadMore } from './actions';
import { Route, Redirect, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import Notifications from 'react-notification-system-redux';

moment.locale('pt-br');
const history = createHistory({basename: "/"});
const middleware = applyMiddleware(thunk, createLogger(), routerMiddleware(history));
const store = createStore(reducer, middleware);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/profile/:id?" component={ProfileContainer}/>
        <Route exact path="/search" component={SearchContainer}/>
      </Switch>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('app')
);
