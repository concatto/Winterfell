import React from 'react';
import UserStore from './user-store.js';

export default class ProfileHeader extends React.Component {
  render() {
    const info = UserStore.getInformation();

    return (
      <div>
        <div className="avatarBox" id="avatarSection">
          <h4 className="pull-right" id="following">{`Seguindo (${info.following})`}</h4>
          <div className="text-center">
            <div id="avatarContainer">
              <h3 id="editAvatar" className="hidden-md hidden-xs">EDITAR</h3>
              <img id="mainAvatar" className="img-circle avatarImage" alt="avatar" src={info.avatar}/>
            </div>
            <div className="row">
              <div className="col-xs-8 col-xs-offset-2">
                <div id="profile-name">
                  <h2 id="name-text"><strong>{info.name}</strong></h2>
                  <span className="glyphicon glyphicon-edit pencilEdit"></span>
                </div>
                <input className="btn btn-success" value="Nova Publicação" type="button"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
<h4 class="pull-right" id="following" data-toggle="modal" data-target="#following-list">Seguindo (1024)</h4>
            <div class="avatarBox" id="avatarSection">
                <div class="text-center">
                    <div id="avatarContainer">
                        <h3 id="editAvatar" class="hidden-md hidden-xs">EDITAR</h3>
                        <img id="mainAvatar" class="img-circle avatarImage" alt="avatar" src="https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg">
                    </div>
                    <div class="center-block">
                        <div id="profile-name">
                            <h2 id="name-text"><strong>Samuel Brati Favarin</strong></h2>
                            <span data-toggle="modal" data-target="#change-name" class="glyphicon glyphicon-edit pencilEdit"></span>
                        </div>
                    </div>
                    <input class="btn btn-success" value="Nova Publicação" type="button" data-toggle="modal" data-target="#new-publication" style="margin-top: 14px;">

                </div>
            </div>
            */
