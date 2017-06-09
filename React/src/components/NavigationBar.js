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
            <Navbar.Brand>
              <Image src={avatar} circle/>
              <span>{name}</span>
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle/>
        </Navbar.Header>

        <Navbar.Collapse>
          <div className="pull-right">
            <Navbar.Form>
              <Form onSubmit={(e) => this.handleSubmit(e)}>
                {withSearch &&
                  <FormGroup>
                    <InputGroup>
                      <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                      <FormControl onChange={(e) => this.handleChange(e)} type="text" placeholder="Pesquisar amigos"/>
                    </InputGroup>
                  </FormGroup>
                }
              </Form>
            </Navbar.Form>

            <Button className="navbar-btn">Sair</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
