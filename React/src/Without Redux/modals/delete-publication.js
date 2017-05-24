import React from 'react';
import Modal from './modal.js';
import ModalBase from './modal-base.js';

class DeleteModal extends React.Component {
  render() {
    return (
      <Modal title="Confirmação" id={this.props.id}>
        <div className="modal-body">
          <p>Tem certeza que deseja excluir esta publicação? Esta operação não pode ser desfeita.</p>
        </div>

        <div className="modal-footer">
          <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar"/>
          <input type="button" className="btn btn-danger" value="Excluir"
            onClick={(e) => this.props.callback()}/>
        </div>
      </Modal>
    );
  }
}

export default class DeletePublication extends ModalBase {
  constructor() {
    super("delete-publication");

    this.callback = this.callback.bind(this);
    this.modal = <DeleteModal id={this.id} key={this.id} callback={this.callback}/>;
  }

  callback() {
    console.log("I am removing " + this.targetId);
    this.close();
  }

  willOpen(args) {
    this.targetId = args.targetId;
  }
}
