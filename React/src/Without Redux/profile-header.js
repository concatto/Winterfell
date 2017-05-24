import React from 'react';
import UserStore from './user-store.js';
import Modals from './modals.js';

export default class ProfileHeader extends React.Component {
  render() {
    const info = UserStore.getInformation();

    return (
      <div>
        <div className="avatarBox" id="avatarSection">
          <h4 className="pull-right" id="following" onClick={(e) => Modals.open("see-following")}>
            {`Seguindo (${info.following})`}
          </h4>
          <div className="text-center">
            <div id="avatarContainer">
              <h3 id="editAvatar" className="hidden-md hidden-xs">EDITAR</h3>
              <img id="mainAvatar" className="img-circle avatarImage" alt="avatar" src={info.avatar}/>
            </div>
            <div className="row">
              <div className="col-xs-8 col-xs-offset-2">
                <div id="profile-name">
                  <h2 id="name-text"><strong>{info.name}</strong></h2>
                  <span className="glyphicon glyphicon-edit pencilEdit"
                    onClick={(e) => Modals.open("change-name")}></span>
                </div>
                <input className="btn btn-success" value="Nova Publicação" type="button"
                  onClick={(e) => Modals.open("new-publication")}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
