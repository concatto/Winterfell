import React from 'react';
import { ListGroup, ListGroupItem, Media, Image, Glyphicon } from 'react-bootstrap';
import { createProfileHref } from '../utils'

const makeDescription = (publications, following) => (
  publications + (publications == 1 ? " publicação" : " publicações") + " - seguindo " + following
);

const PersonCard = ({avatar, id, name, publications, following, isFollowing, onClick, displayFollowing}) => (
  <ListGroupItem onClick={onClick} href={createProfileHref(id)}>
    <Media>
      <Media.Left>
        <Image src={avatar} rounded/>
      </Media.Left>
      <Media.Body>
        <Media.Heading>
          <strong>{name}</strong>
        </Media.Heading>
        <small>{makeDescription(publications, following)}</small>

        {isFollowing && displayFollowing &&
          <p className="text-success">
            <small><Glyphicon glyph="ok"/> Seguindo</small>
          </p>
        }
      </Media.Body>
    </Media>
  </ListGroupItem>
);

export default class PersonList extends React.Component {
  handleClick(e, id) {
    e.preventDefault();
    this.props.visitProfile(id);
  }

  mapDataToComponents() {
    const { data, displayFollowing } = this.props;

    if (!data) {
      return null;
    }

    return data.map((user) => (
      <PersonCard {...user} key={user.id} displayFollowing={displayFollowing}
        onClick={(e) => this.handleClick(e, user.id)}/>
    ));
  }

  render() {
    return (
      <ListGroup onScroll={(e) => this.props.onScroll(e)} className={this.props.className}>
        {this.mapDataToComponents()}
      </ListGroup>
    );
  }
}
