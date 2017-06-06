import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default class BaseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {hide: () => this.props.onHide()};
  }

  render() {
    const { onHide, children, modalProps, shown } = this.props;

    return (
      <Modal {...modalProps} show={shown} onHide={() => onHide()}>
        {children}
      </Modal>
    );
  }
}

BaseModal.Footer = class Footer extends React.Component {
  render() {
    return (
      <Modal.Footer>
        {this.props.withCancel &&
          <Button onClick={() => this.context.hide()}>
            {this.props.withCancel}
          </Button>
        }

        {this.props.children}
      </Modal.Footer>
    );
  }
}

BaseModal.Header = ({children}) => (
  <Modal.Header closeButton>
    <Modal.Title>{children}</Modal.Title>
  </Modal.Header>
);

BaseModal.Body = ({children, maximumHeight=undefined}) => (
  <Modal.Body>
    <div style={{maxHeight: maximumHeight}}>
      {children}
    </div>
  </Modal.Body>
);

BaseModal.Wrapper = ({children}) => (
  <div>
    {children}
  </div>
);

BaseModal.Footer.contextTypes = {hide: PropTypes.func};
BaseModal.childContextTypes = {hide: PropTypes.func};
