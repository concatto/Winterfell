import React from 'react';
import BaseModal from './BaseModal';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Media, Image } from 'react-bootstrap';
import { createProfileHref } from '../../utils'

const FollowingCard = ({avatar, id, name, publications, following, onClick}) => (
  <ListGroupItem onClick={onClick} href={createProfileHref(id)}>
    <Media>
      <Media.Left>
        <Image src={avatar} rounded/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>
          <strong>{name}</strong>
        </Media.Heading>
        <small>{publications + " publicações - seguindo " + following.length}</small>
      </Media.Body>
    </Media>
  </ListGroupItem>
);

export default class ViewFollowing extends React.Component {
  mapUsersToComponents() {
    if (!this.props.following) {
      return null;
    }

    const handleClick = (e, id) => {
      e.preventDefault();
      this.props.navigateTo(id);
    }

    return this.props.following.map((user) => (
      <FollowingCard {...user} key={user.id} onClick={(e) => handleClick(e, user.id)}/>
    ));
  }

  render() {
    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Pessoas que você segue</BaseModal.Header>

        <BaseModal.Body maximumHeight={400}>
          <ListGroup className="following-list">
            {this.mapUsersToComponents()}
          </ListGroup>
        </BaseModal.Body>

        <BaseModal.Footer withCancel="Fechar"></BaseModal.Footer>
      </BaseModal.Wrapper>
    );
  }
}
