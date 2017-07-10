import React from 'react';
import { render } from 'react-dom';
import { Button, Col, Row, Glyphicon, Carousel, Modal, showModal, Show, FormGroup, FormControl, Form, ControlLabel, Checkbox, Thumbnail, Grid, Navbar,InputGroup} from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import FadeIn from 'react-fade-in';
import { connect } from 'react-redux';
import { authenticate, createAccount } from './actions/asyncActions';

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
        <Button bsStyle="link" onClick={this.open}>
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


let ModalCadastrar = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  handleSubmit(e) {
    e.preventDefault();
    if (this.email.value != this.email2.value) {
      alert("E-mails discrepantes!");
      return;
    }

    this.props.createAccount(this.name.value, this.user.value, this.email.value, this.pass.value);
  },

  render() {
    return (
      <div>
        <Button bsStyle="info" onClick={this.open}>
           { this.props.name }
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title> Criar Conta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              <FormGroup controlId="formHorizontalEmail">
                <p> Nome completo </p>
                <Col>
                  <FormControl type="text" placeholder="Nome completo" inputRef={(r) => this.name = r} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <p> Usuario </p>
                <Col>
                  <FormControl type="text" placeholder="Usuario" inputRef={(r) => this.user = r} />
                </Col>

                </FormGroup>


              <FormGroup controlId="formHorizontalEmail">
                <p> Email </p>
                <Col>
                  <FormControl type="email" placeholder="Email" inputRef={(r) => this.email = r} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalEmail">
                <p> Confirmar Email </p>
                <Col>
                  <FormControl type="email" placeholder="Email" inputRef={(r) => this.email2 = r} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <p> Senha </p>
                <Col>
                  <FormControl type="password" placeholder="Senha" inputRef={(r) => this.pass = r} />
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

ModalCadastrar = connect((state) => ({

}), {createAccount})(ModalCadastrar);

class Home extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticate(this.userInput.value, this.passInput.value, this.remember.checked);
  }

  render(){
    return (
      <div className="home-root">
        <div className="espaco_Thumb">
          <Col>
            <Thumbnail>
              <div><h2><b> Bem Vindo ao WinterPics! </b></h2> </div>
              <div>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                <p><b>Usuário</b></p>
                <FormGroup controlId="formHorizontalEmail">
                  <Col>
                    <FormControl type="text" placeholder="Usuário" inputRef={(r) => this.userInput = r} required/>
                  </Col>

                  <p></p>
                  <p><b>Senha</b></p>
                  <Col>
                    <FormControl type="password" placeholder="Senha" inputRef={(r) => this.passInput = r} required/>
                  </Col>
                </FormGroup>

                <Checkbox inputRef={(r) => this.remember = r}> Relembrar-me </Checkbox>
                <Col>
                  <Button bsStyle="primary" type="submit" disabled={this.props.authenticating}> Entrar </Button>
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

const stateMapper = (state) => ({
  authenticating: state.ui.authenticating,
});

export default connect(stateMapper, {authenticate})(Home);
