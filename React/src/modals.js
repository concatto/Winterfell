import React from 'react';
import DeletePublication from './modals/delete-publication.js';
import FollowingList from './modals/following-list.js';

class Modals {
  constructor() {
    this.modals = {
      "delete-pub": new DeletePublication,
      "see-following": new FollowingList
    }
  }

  open(command, args) {
    const modal = this.modals[command];
    modal.willOpen(args);
    $("#" + modal.id).modal();
  }

  getAll() {
    return Object.keys(this.modals).map((key) => {
      return this.modals[key].modal;
    });
  }
}

const modals = new Modals;
export default modals;
