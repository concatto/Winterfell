import React from 'react';
import Modal from './modal.js';
import ModalBase from './modal-base.js';
import UserStore from '../user-store.js';

class ChangeNameModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.callback(this.input.value);
  }

  render() {
    return (
      <Modal title="Alterar nome" id={this.props.id}>
        <div className="modal-body">
          <form id="name-change-form" onSubmit={(e) => this.handleSubmit(e)}>
              <input type="text" required className="form-control autofocus" id="newName"
                placeholder="Novo nome" ref={(input) => this.input = input}/>
          </form>
        </div>

        <div className="modal-footer">
          <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar"/>
          <input type="submit" className="btn btn-success" form="name-change-form" value="Confirmar"/>
        </div>
      </Modal>
    );
  }
}

export default class ChangeName extends ModalBase {
  constructor() {
    super("change-name");
    this.callback = this.callback.bind(this);
    this.modal = <ChangeNameModal id={this.id} key={this.id} callback={this.callback}/>;
  }

  callback(name) {
    console.log("Changing name of " + UserStore.getInformation().id + " to " + name);
    this.close();
  }
}
