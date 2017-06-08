import React from 'react';
import BaseModal from './BaseModal';
import FileChooser from '../FileChooser';
import { Form, FormGroup, FormControl, Image } from 'react-bootstrap';

export default class NewPublication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      image: "/assets/pic.jpg",
      hasImage: false
    };
  }

  handleChoose(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e);
      this.setState({image: e.target.result, hasImage: true});
    }

    reader.readAsDataURL(file);
  }

  handleChange(e) {
    this.setState({title: e.target.value});
  }

  handleConfirm() {
    //If an image was chosen
    if (this.state.hasImage) {
      const { title, image } = this.state;

      this.props.onConfirm({title, image});
    } else {
      //Maybe use a proper dialog
      alert("Selecione uma imagem!");
    }
  }

  render() {
    return (
      <BaseModal.Wrapper>
        <BaseModal.Header>Nova publicação</BaseModal.Header>

        <BaseModal.Body>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <FormControl type="text" value={this.state.title}
                placeholder="Título da nova publicação"
                onChange={(e) => this.handleChange(e)}
              />
            </FormGroup>
          </Form>

          <div className="publication-image" onClick={() => this.chooser.click()}>
            <Image src={this.state.image} thumbnail={!this.state.hasImage}/>
          </div>

          <FileChooser refCallback={(c) => this.chooser = c}
            onChoose={(f) => this.handleChoose(f)}>Escolher Imagem</FileChooser>
        </BaseModal.Body>

        <BaseModal.Footer withCancel="Cancelar">
          <BaseModal.ConfirmButton bsStyle="success" onClick={() => this.handleConfirm()}>
            Publicar
          </BaseModal.ConfirmButton>
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    );
  }
}

NewPublication.baseProps = {bsSize: "large"};
