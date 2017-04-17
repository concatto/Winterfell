import React from 'react';
import PublicationStore from './publication-store.js';

export default class PublicationSelector extends React.Component {
  constructor() {
    super();
    this.state = {feed: "active", self: ""};
  }

  handle(isSelf) {
    this.setState({
      feed: isSelf ? "" : "active",
      self: isSelf ? "active" : ""
    });

    PublicationStore.setFilter(isSelf);
  }

  render() {
    return (
      <ul className="nav nav-pills nav-justified profile-tabs">
        <li id="selectFeed1" className={this.state.feed} onClick={(e) => this.handle(false)}>
          <a>Feed de Publicações</a>
        </li>
        <li id="selectFeed2" className={this.state.self} onClick={(e) => this.handle(true)}>
          <a>Minhas publicações</a>
        </li>
      </ul>
    );
  }
}
