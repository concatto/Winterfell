import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormGroup, InputGroup, FormControl, Button, Image, Glyphicon } from 'react-bootstrap';
import { createProfileHref } from '../utils';

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
    const { id, avatar, name, withSearch } = this.props;

    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Link to={createProfileHref(id)}>
            <Image src={avatar} circle/>
            <Navbar.Brand>
              <span>{name}</span>
              </Navbar.Brand>
          </Link>
          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Navbar.Form pullRight>
              {withSearch &&
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                    <FormControl onChange={(e) => this.handleChange(e)} type="text" placeholder="Pesquisar amigos"/>
                  </InputGroup>
                </FormGroup>
              }

              <Button>Sair</Button>
            </Navbar.Form>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
