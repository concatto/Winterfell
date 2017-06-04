import React from 'react';
import BaseModal from './BaseModal';
import FileChooser from '../FileChooser';
import { Button, Image } from 'react-bootstrap';

export default class ChangeAvatar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {image: props.avatar, changed: false};
  }

  handleChoose(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e);
      this.setState({image: e.target.result, changed: true});
    }

    reader.readAsDataURL(file);
  }

  render() {
    const confirmHandler = () => {
      this.props.onConfirm(this.state.changed ? {image: this.state.image} : undefined);
    };

    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Alterar imagem</BaseModal.Header>

        <BaseModal.Body>
          <div className="change-avatar">
            <Image src={this.state.image} thumbnail/>
            <FileChooser onChoose={(f) => this.handleChoose(f)}>Escolher imagem</FileChooser>
          </div>
        </BaseModal.Body>

        <BaseModal.Footer withCancel="Cancelar">
          <Button onClick={confirmHandler} bsStyle="success">Confirmar</Button>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    )
  }
}
