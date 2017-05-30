import React from 'react';
import { Button, Image, Row, Col, Glyphicon } from 'react-bootstrap';

const ProfileHeader = ({isSelf, isFollowing, name, avatar, following, actions}) => {
  const {
    onNewPublication,
    onToggleFollowing,
    onRename,
    onEditAvatar,
    onSeeFollowing
  } = actions;

  let button = null;
  if (isSelf) {
    button = <Button bsStyle="success" onClick={() => onNewPublication()}>Nova Publicação</Button>;
  } else {
    const buttonType = isFollowing ? "danger" : "primary";
    const buttonText = isFollowing ? "Parar de seguir" : "Seguir";

    button = <Button bsStyle={buttonType} onClick={() => onToggleFollowing()}>{buttonText}</Button>;
  }

  return (
    <div className="profile-header">
      <h4 onClick={() => onSeeFollowing()}>
        {"Seguindo (" + following + ")"}
      </h4>
      <div className="text-center">
        <div>
          <Image onClick={() => onEditAvatar()} src={avatar} circle/>
        </div>

        <Row>
          <Col xs={8} xsOffset={2}>
            <div>
              <div className="profile-name">
                <h2><strong>{name}</strong></h2>
                <Glyphicon glyph="pencil" onClick={() => onRename(name)}/>
              </div>
            </div>

            {button}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProfileHeader;
