import React from 'react';
import Modal from './modal.js';

export default class DeletePublication extends React.Component {
  render() {
    return (
      <Modal title="Confirmação" id={this.props.id}>
        <div className="modal-body">
          <p>Tem certeza que deseja excluir esta publicação? Esta operação não pode ser desfeita.</p>
        </div>

        <div className="modal-footer">
          <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancelar"/>
          <input type="button" className="btn btn-danger" data-dismiss="modal" value="Excluir"/>
        </div>
      </Modal>
    );
  }
}
