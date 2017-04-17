import React from 'react';
import DeletePublication from './modals/delete-publication.js';

class Modals {
  constructor() {
    this.modals = {
      "delete-pub": this.create(DeletePublication, "delete-publication")
    }
  }

  create(ModalType, id) {
    return {
      modal: <ModalType id={id} key={id}/>,
      id: id
    };
  }

  open(command, args) {
    $(`#${this.modals[command].id}`).modal();
  }

  getAll() {
    return Object.keys(this.modals).map((key) => {
      return this.modals[key].modal;
    });
  }
}

const modals = new Modals;
export default modals;
