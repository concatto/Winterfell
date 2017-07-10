import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
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
import Unauthorized from './components/Unauthorized';
import Home from './Home2';

moment.locale('pt-br');
const history = createHistory({basename: "/"});
const middleware = applyMiddleware(thunk, createLogger(), routerMiddleware(history));
const store = createStore(reducer, middleware);
window.store = store;


let NotificationRoot = ({notifications}) => (
  <Notifications notifications={notifications}/>
);

NotificationRoot = connect((state) => ({
  notifications: state.notifications
}))(NotificationRoot);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/profile/:id?" component={ProfileContainer}/>
          <Route exact path="/search" component={SearchContainer}/>
          <Route exact path="/unauthorized" component={Unauthorized}/>
        </Switch>
        <NotificationRoot/>
      </div>
    </ConnectedRouter>
  </Provider>,

  document.getElementById('app')
);
