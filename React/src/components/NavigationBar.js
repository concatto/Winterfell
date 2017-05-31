import React from 'react';
import { Nav, Navbar, Form, FormGroup, InputGroup, FormControl, Button, Image, Glyphicon } from 'react-bootstrap';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchString: ""};
  }

  handleChange(e) {
    this.setState({searchString: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.state.searchString);
  }

  render() {
    const { id, avatar, name } = this.props;

    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <a href={"/profile/" + id}>
            <Image src={avatar} circle/>
            <Navbar.Brand>
              <span>{name}</span>
              </Navbar.Brand>
          </a>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Navbar.Form pullRight>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                  <FormControl onChange={(e) => this.handleChange(e)} type="text" placeholder="Pesquisar amigos"/>
                </InputGroup>
              </FormGroup>

              <Button>Sair</Button>
            </Navbar.Form>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
