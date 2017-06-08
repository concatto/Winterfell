import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default class BaseModal extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {
      hide: () => this.props.onHide(),
      busy: this.props.busy,
    };
  }

  render() {
    const { onHide, children, baseProps, shown } = this.props;

    return (
      <Modal {...baseProps} show={shown} onHide={() => onHide()}>
        {children}
      </Modal>
    );
  }
}

BaseModal.Footer = (props, context) => (
  <Modal.Footer>
    {props.withCancel &&
      <Button onClick={() => context.hide()}>
        {props.withCancel}
      </Button>
    }

    {props.children}
  </Modal.Footer>
);

BaseModal.ConfirmButton = (props, context) => (
  <Button {...props} disabled={context.busy}>
    {props.children}
  </Button>
)

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
BaseModal.ConfirmButton.contextTypes = {busy: PropTypes.bool};
BaseModal.childContextTypes = {hide: PropTypes.func, busy: PropTypes.bool};
