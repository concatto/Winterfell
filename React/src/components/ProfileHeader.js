import React from 'react';
import { Button, Image, Row, Col, Glyphicon } from 'react-bootstrap';

const ProfileHeader = ({isSelf, isFollowing, id, name, avatar, following, actions, toggling}) => {
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

    button = (
      <Button bsStyle={buttonType} onClick={() => onToggleFollowing(id, !isFollowing)} disabled={toggling}>
        {buttonText}
      </Button>
    );
  }

  const avatarHandler = isSelf ? () => onEditAvatar(avatar) : null;

  return (
    <div className="profile-header">
      <h4 onClick={() => onSeeFollowing(id)}>
        {"Seguindo (" + following + ")"}
      </h4>
      <div className="text-center">
        <div>
          <div>
            <Image src={avatar} circle className={isSelf ? "own" : ""} onClick={avatarHandler}/>

            {isSelf && <Glyphicon glyph="edit" onClick={avatarHandler} className="circular-icon"/>}
          </div>
        </div>

        <Row>
          <Col xs={8} xsOffset={2}>
            <div>
              <div className="profile-name">
                <h2><strong>{name}</strong></h2>
                {isSelf &&
                  <Glyphicon glyph="pencil" onClick={() => onRename(name)}/>
                }
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
