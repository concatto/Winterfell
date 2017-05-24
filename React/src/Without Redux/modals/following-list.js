import React from 'react';
import Modal from './modal.js';
import ModalBase from './modal-base.js';
import FollowingStore from '../following-store.js';
import PersonCard from '../person-card.js';

class FollowingModal extends React.Component {
  constructor() {
    super();
    this.state = {following: this.getFollowing()};
  }

  update() {
    this.setState({following: this.getFollowing()});
  }

  getFollowing() {
    return FollowingStore.getAll().map((person) =>
      <PersonCard details={person} key={person.id}/>
    );
  }

  render() {
    return (
      <Modal title="Seguindo" id={this.props.id}>
        <div className="modal-body">
          <ul className="list-group nav seguidores">
            {this.state.following}
          </ul>
        </div>

        <div className="modal-footer">
          <input type="button" className="btn btn-default" data-dismiss="modal" value="Fechar"/>
        </div>
      </Modal>
    );
  }
}

export default class FollowingList extends ModalBase {
  constructor() {
    super("following-list");
    this.modal = <FollowingModal id={this.id} key={this.id}/>;
  }
}
