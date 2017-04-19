import React from 'react';
import DeletePublication from './modals/delete-publication.js';
import FollowingList from './modals/following-list.js';
import ChangeName from './modals/change-name.js';
import NewPublication from './modals/new-publication.js';

class Modals {
  constructor() {
    this.modals = {
      "delete-pub": new DeletePublication,
      "see-following": new FollowingList,
      "change-name": new ChangeName,
      "new-publication": new NewPublication
    }
  }

  open(command, args) {
    this.modals[command].open(args);
  }

  getAll() {
    return Object.keys(this.modals).map((key) => {
      return this.modals[key].modal;
    });
  }
}

const modals = new Modals;
export default modals;
