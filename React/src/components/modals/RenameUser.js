import React from 'react';
import BaseModal from './BaseModal';
import { Modal, Button, FormGroup, FormControl, Form } from 'react-bootstrap';

export default class RenameUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: props.name};
  }

  handleChange(e) {
    this.setState({name: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onConfirm({name: this.state.name});
  }

  render() {
    const { busy } = this.props;

    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Alterar nome</BaseModal.Header>

        <BaseModal.Body>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <FormControl
                type="text"
                placeholder="Novo nome"
                value={this.state.name}
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup>
          </Form>
        </BaseModal.Body>

        <BaseModal.Footer withCancel="Cancelar">
          <Button disabled={busy} bsStyle="success" onClick={(e) => this.handleSubmit(e)}>Confirmar</Button>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    );
  }
}
