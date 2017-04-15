import React from 'react';
import NavSearch from './nav-search.js';
import UserBar from './user-bar.js';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <UserBar/>
          <div className="collapse navbar-collapse">
            <div className="navbar-right">
              <NavSearch/>
              <a className="logout btn btn-default navbar-btn" href="#">Sair</a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
