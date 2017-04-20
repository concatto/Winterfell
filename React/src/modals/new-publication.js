import React from 'react';
import Modal from './modal.js';
import ModalBase from './modal-base.js';
import NewPublicationForm from '../new-publication-form.js';

class NewPublicationModal extends React.Component {
  render() {
    return (
      <Modal title="Nova publicação" id={this.props.id}>
        <div className="modal-body">
          <NewPublicationForm callback={this.props.callback}/>
        </div>

        <div className="modal-footer">
          <div className="pull-left">
            <input className="btn btn-default" value="Cancelar" type="submit" data-dismiss="modal"/>
          </div>
          <div className="pull-right">
            <input className="btn btn-success" form="new-publication-form" value="Publicar" type="submit"/>
          </div>
        </div>
      </Modal>
    );
  }
}

export default class NewPublication extends ModalBase {
  constructor() {
    super("new-publication");
    this.modal = <NewPublicationModal id={this.id} key={this.id} callback={this.callback.bind(this)}/>;
  }

  callback(title, data) {
    const kb = data.length * 0.00075;
    console.log("Title is " + title + " and data has approx. " + Math.round(kb) + " kB.");
    this.close();
  }
}
