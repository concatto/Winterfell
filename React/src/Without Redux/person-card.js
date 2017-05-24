import React from 'react';

export default class PersonCard extends React.Component {
  render() {
    const {id, avatar, name, publications, following} = this.props.details;

    return (
      <li className="list-group-item">
        <div className="media avatarBox">
          <div className="media-left">
            <img className="media-object img-rounded" src={avatar}/>
          </div>
          <div className="media-body">
            <a href={"/profile/" + id}>
              <h4 className="media-heading"><strong>{name}</strong></h4>
            </a>
            <small>
              {publications + " publicações - seguindo " + following}
            </small>
          </div>
        </div>
      </li>
    );
  }
}
