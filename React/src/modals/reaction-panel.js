import React from 'react';
import Modal from './modal.js';
import ModalBase from './modal-base.js';
import PublicationStore from '../publication-store';

class ReactionCell extends React.Component {
  render() {
    const {active, handler, idx, percentage} = this.props;
    const activeStr = (active ? "active" : "");

    return (
      <div className="col-xs-4">
        <a className={"thumbnail " + activeStr} onClick={(e) => handler(e, idx)}>
          <img src="/assets/avatar.jpg" className="img-responsive"/>
          {percentage.toFixed(1) + "%"}
        </a>
      </div>
    );
  }
}

class ReactionsModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {reactions: [], idx: null};

    PublicationStore.on("active-change", (args) => {
      const publication = PublicationStore.getPublication(args.pubId);

      this.setState({
        reactions: publication.reactions,
        idx: publication.ownReaction
      });
    });
  }

  handleClick(event, idx) {
    idx = (idx == this.state.idx ? null : idx);

    this.setState({idx});
  }

  render() {
    let sum = this.state.reactions.reduce((a, b) => a + b, 0);

    const cells = this.state.reactions.map((e, i) =>
      <ReactionCell percentage={(e / sum) * 100} key={i} idx={i}
        active={this.state.idx === i} handler={this.handleClick.bind(this)}/>
    );

    const rows = [0, 3, 6].map((e) =>
      <div className="row" key={e}>
        {cells.slice(e, e + 3)}
      </div>
    );

    return (
      <Modal title="Escolha uma reação" id={this.props.id}>
        <div className="modal-body">
          <div className="modal-body" id="reactionGrid">
            {rows}
          </div>
        </div>

        <div className="modal-footer">
          <input type="button" className="btn btn-default" value="Cancelar" data-dismiss="modal"/>
          <input type="button" className="btn btn-success" value="Reagir"
            onClick={(e) => this.props.callback(this.state.idx)}/>
        </div>
      </Modal>
    );
  }
}

export default class ReactionPanel extends ModalBase {
  constructor() {
    super("reaction-panel");
    this.modal = <ReactionsModal id={this.id} key={this.id} callback={this.callback.bind(this)}/>;
  }

  willOpen(args) {
    PublicationStore.setActivePublication(args.pubId);
  }

  callback(idx) {
    if (idx) {
      console.log("Reacting with " + idx);
    } else {
      console.log("Removing reaction");
    }

    this.close();
  }
}
