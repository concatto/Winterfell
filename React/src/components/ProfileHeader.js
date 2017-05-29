import React from 'react';

const ProfileHeader = ({name, avatar, following, onRename}) => (
  <div>
    <div className="avatarBox" id="avatarSection">
      <h4 className="pull-right" id="following" onClick={(e) => alert("NYI")}>
        {"Seguindo (" + following + ")"}
      </h4>
      <div className="text-center">
        <div id="avatarContainer">
          <h3 id="editAvatar" className="hidden-md hidden-xs">EDITAR</h3>
          <img id="mainAvatar" className="img-circle avatarImage" alt="avatar" src={avatar}/>
        </div>
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <div id="profile-name">
              <h2 id="name-text"><strong>{name}</strong></h2>
              <span className="glyphicon glyphicon-edit pencilEdit"
                onClick={(e) => onRename(name)}></span>
            </div>
            <input className="btn btn-success" value="Nova Publicação" type="button"
              onClick={(e) => alert("NYI")}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileHeader;
