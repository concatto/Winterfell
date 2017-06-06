import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import ProfileContainer from './containers/ProfileContainer';
import SearchContainer from './containers/SearchContainer';
import NavigationBarContainer from './containers/SearchContainer';
import reducer from './reducers';
import moment from 'moment';
import { loadMore } from './actions';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

moment.locale('pt-br');
const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, middleware);

render(
  <Provider store={store}>
    <Router>
      <div>
        <NavigationBarContainer/>
    
        <Switch>
          <Route path="/profile/:id?" component={ProfileContainer}/>
          <Route path="/search/:string?" component={SearchContainer}/>
          <Redirect from="/profile" exact to={"/profile/" + store.getState().currentUser}/>
        </Switch>
      
      </div>
    </Router>
  </Provider>,

  document.getElementById('app')
);
