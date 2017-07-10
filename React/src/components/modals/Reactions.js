import React from 'react';
import BaseModal from './BaseModal';
import { Modal, Button, Thumbnail, Col, Row } from 'react-bootstrap';

export default class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reaction: props.ownReaction};
    this.reactionData = [
      {image: "/assets/gostei.png", label: "Gostei!"},
      {image: "/assets/rimuito.png", label: "Ri muito!"},
      {image: "/assets/fofo.png", label: "Fofo!"},
      {image: "/assets/fazeroque.png", label: "Fazer o que..."},
      {image: "/assets/quemseimporta.png", label: "Quem se importa?"},
      {image: "/assets/nojento.png", label: "Nojento!"},
      {image: "/assets/odiei.png", label: "Odiei!"},
      {image: "/assets/frustrante.png", label: "Frustrante!"},
      {image: "/assets/aterrorizante.png", label: "Aterrorizante!"},
    ];

    this.proportions = props.reactions.data.map((item) => item / props.reactions.sum);
  }

  handleReact(index) {
    if (this.props.isOwn) {
      return;
    }

    if (this.state.reaction == index) {
      this.setState({reaction: undefined}); //If the user clicked the current reaction, remove it.
    } else {
      this.setState({reaction: index});
    }
  }

  mapReactionsToComponents() {
    return this.reactionData.map((item, index) => {
      let className = "reaction";
      if (index == this.state.reaction){
        className += " active";
      }
      if (this.props.isOwn) {
        className += " passive";
      }
      const percent = this.proportions[index] * 100;
      const text = isNaN(percent) ? "-" : (Math.round(percent) + "%");

      return (
        <Col md={4} xs={6} key={index} className={className}>
          <Thumbnail src={item.image} alt={item.label} onClick={() => this.handleReact(index)}>
            <p>{item.label}</p>
            <h5>{text}</h5>
          </Thumbnail>
        </Col>
      );
    });
  }

  handleConfirm() {
    if (this.state.reaction == this.props.ownReaction) {
      this.props.onHide();
    } else {
      this.props.onConfirm({
        index: this.state.reaction === undefined ? -1 : this.state.reaction,
        id: this.props.id,
        info: this.reactionData[this.state.reaction]
      });
    }
  }

  render() {
    return (
      <BaseModal.Wrapper>
        <BaseModal.Body>
          <Row>
            {this.mapReactionsToComponents()}
          </Row>
        </BaseModal.Body>

        <BaseModal.Footer withCancel={this.props.isOwn ? "Fechar" : "Cancelar"}>
          {!this.props.isOwn &&
            <BaseModal.ConfirmButton bsStyle="success" onClick={() => this.handleConfirm()}>
              Confirmar
            </BaseModal.ConfirmButton>
          }
        </BaseModal.Footer>
      </BaseModal.Wrapper>
    );
  }
}
