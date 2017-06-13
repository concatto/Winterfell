import React from 'react';
import BaseModal from './BaseModal';
import FileChooser from '../FileChooser';
import { Image } from 'react-bootstrap';

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
    
  confirmHandler() {
      //this.props.onConfirm(this.state.changed ? {image: this.state.image} : undefined);
      this.props.onError("Deu erro porque eu quis");
  }

  render() {

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
          <BaseModal.ConfirmButton onClick={() => this.confirmHandler()} bsStyle="success">
            Confirmar
          </BaseModal.ConfirmButton>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    )
  }
}
