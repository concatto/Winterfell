import React from 'react';

const Navbar = ({id, avatar, name}) => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container-fluid">
      <a href={"/profile/" + id} className="navbar-header">
        <img className="img-circle" src={avatar}/>
        <span className="navbar-brand" id="currentUserName">
          {name}
        </span>
      </a>

      <div className="collapse navbar-collapse">
        <div className="navbar-right">
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

          <a className="logout btn btn-default navbar-btn" href="#">Sair</a>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
