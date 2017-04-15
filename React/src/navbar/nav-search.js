import React from 'react';

export default class NavSearch extends React.Component {
  render() {
    return (
      <form className="navbar-form navbar-left form-inline" id="search-form" method="get" action="search.html">
        <div className="form-group search-friends">
          <div className="input-group">
            <div className="input-group-addon">
              <span className="glyphicon glyphicon-search"></span>
            </div>
            <input type="submit" className="hidden"/>
            <input className="form-control" name="name" placeholder="Pesquisar amigos" type="text"/>
          </div>
        </div>
      </form>
    );
  }
}
