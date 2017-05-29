import React from 'react';
import BaseModal from './BaseModal';
import { Modal, Button, FormGroup, FormControl } from 'react-bootstrap';

export default class RenameUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: props.name};
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  render() {
    const { onConfirm, onHide } = this.props;
    const { name } = this.state;

    return (
      <BaseModal title="Alterar nome" onHide={onHide}>
        <Modal.Body>
          <form>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Novo nome"
                value={name}
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup>
          </form>
        </Modal.Body>

        <BaseModal.Footer withCancel="Cancelar">
          <Button bsStyle="success" onClick={() => onConfirm({name})}>Confirmar</Button>
        </BaseModal.Footer>
      </BaseModal>
    );
  }
}
