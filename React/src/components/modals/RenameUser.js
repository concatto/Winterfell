import React from 'react';
import BaseModal from './BaseModal';
import { Modal, Button, FormGroup, FormControl, Form } from 'react-bootstrap';

export default class RenameUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: props.name,
        validation: this.testValidation(props.name),
    };
  }

  testValidation(value) {
    if (value.length == 0) {
        return null;
    } else if (value.length > 20) {
        return "error";
    } else {
        return "success";
    }
  }
    
  handleChange(e) {
    this.setState({
        name: e.target.value,
        validation: this.testValidation(e.target.value)
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.validation == "success") {
        this.props.onConfirm({name: this.state.name});
    } else {
        console.log(this.props);
        this.props.onError("Nome muito comprido.");
    }
  }

  render() {
    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Alterar nome</BaseModal.Header>

        <BaseModal.Body>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup validationState={this.state.validation}>
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
          <BaseModal.ConfirmButton bsStyle="success" onClick={(e) => this.handleSubmit(e)}>
            Confirmar
          </BaseModal.ConfirmButton>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    );
  }
}
