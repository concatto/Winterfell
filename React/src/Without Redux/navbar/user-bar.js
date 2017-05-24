import React from 'react';
import UserStore from '../user-store.js';

export default class UserBar extends React.Component {
  render() {
    const {id, name, avatar} = UserStore.getInformation();
    return (
      <a href={"/profile/" + id} className="navbar-header">
        <img className="img-circle" src={avatar}/>
        <span className="navbar-brand" id="currentUserName">
          {name}
        </span>
      </a>
    );
  }
}
