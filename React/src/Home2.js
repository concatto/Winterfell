import React from 'react';
import { render } from 'react-dom';
import { Button, Col, Row, Glyphicon, Carousel, Modal, showModal, Show, FormGroup, FormControl, Form, ControlLabel, Checkbox, Thumbnail, Grid, Navbar,InputGroup} from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import FadeIn from 'react-fade-in';


const Esquecer_Senha = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>

        <Button
          bsStyle="link"
          bsSize=""
          onClick={this.open}
        >
           { this.props.name }
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title><b> Relembrar Senha </b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <Form>
              <FormGroup controlId="formHorizontalEmail">
                <p><b> Email </b></p>
                <Col>
                  <FormControl type="email" placeholder="Email" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col>
                  <Button type="submit">
                    Enviar
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Sair</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});


const ModalCadastrar = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>

        <Button
          bsStyle="info"
          bsSize="md"
          onClick={this.open}
        >
           { this.props.name }
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title> Criar Conta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <Form>
              <FormGroup controlId="formHorizontalEmail">
                <p> Usuario </p>
                <Col>
                  <FormControl type="text" placeholder="Usuario" />
                </Col>

                </FormGroup>
              <FormGroup controlId="formHorizontalEmail">
                <p> Email </p>
                <Col>
                  <FormControl type="email" placeholder="Email" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <p> Confirmar Email </p>
                <Col>
                  <FormControl type="email" placeholder="Email" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <p> Senha </p>
                <Col>
                  <FormControl type="password" placeholder="Senha" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col>
                  <Button type="submit" bsStyle="primary">
                    Criar Conta
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <p className="nomeSite"> <small> WinterPics! </small> </p>
            <Button bsStyle="primary" onClick={this.close}>Sair</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});


class Home extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.emailInput.value);
  }

  render(){
    return (
      <div>
        <div className="espaco_Thumb">
          <Col>
            <Thumbnail>
              <div><h2><b> Bem Vindo ao WinterPics! </b></h2> </div>
              <div>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <p><b> Email </b></p>
                <FormGroup controlId="formHorizontalEmail">
                  <Col>
                    <InputGroup>
                      <InputGroup.Addon>@</InputGroup.Addon>
                      <FormControl type="email" inputRef={(r) => this.emailInput = r} />
                    </InputGroup>
                  </Col>

                  <p></p>
                  <p><b> Senha </b></p>
                  <Col>
                    <FormControl type="password" placeholder="Senha" />
                  </Col>
                </FormGroup>

                <Checkbox> Relembrar-me </Checkbox>
                <Col>
                  <Button bsStyle="primary" type="submit"> Entrar </Button>
                </Col>

              </Form>
              </div>

              <Row>

                <Col md={5}>
                  <span>
                    <Esquecer_Senha name="Esqueceu sua Senha?"/>
                  </span>
                </Col>
                <Col md={5}>
                  <span>
                    <ModalCadastrar name="Criar uma Conta"/>
                  </span>
                </Col>
              </Row>
            </Thumbnail>
          </Col>
        </div>
        <div className="bottom">
          <p className="positionCopy"> WinterPics! &copy; 2017 </p>
        </div>
      </div>
    );
  }
}

export default Home;
