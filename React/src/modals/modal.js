import React from 'react';

export default class Modal extends React.Component {
  render() {
    return (
      <div className="modal fade" id={this.props.id} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>

            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
