import React from 'react';
import BaseModal from './BaseModal';
import { Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Media, Image } from 'react-bootstrap';

const FollowingCard = ({avatar, id, name, publications, following, onClick}) => (
  <ListGroupItem onClick={() => onClick()}>
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
  constructor(props) {
    super(props);
      
    this.state = {targetId: undefined};
  }
    
  mapUsersToComponents() {
    if (!this.props.following) {
      return null;
    }
      
    const redirect = (id) => {
      this.setState({targetId: id});
      this.props.onHide();
    };
      
    return this.props.following.map((user) => (
      <FollowingCard {...user} key={user.id} onClick={() => redirect(user.id)}/>
    ));
  }

  render() {
    if (this.state.targetId) {
      return <Redirect push to={"/profile/" + this.state.targetId}/>
    }
    
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
