import React from 'react';
import { Nav, Navbar, FormGroup, InputGroup, FormControl, Button, Image, Glyphicon } from 'react-bootstrap';

const NavigationBar = ({id, avatar, name}) => (
  <Navbar fixedTop fluid>
    <Navbar.Header>
      <a href={"/profile/" + id}>
        <Image src={avatar} circle/>
        <Navbar.Brand>
          <span>{name}</span>
          </Navbar.Brand>
      </a>
    </Navbar.Header>

    <Navbar.Collapse>
      <Navbar.Form pullRight>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
            <FormControl type="text" placeholder="Pesquisar amigos"/>
          </InputGroup>
        </FormGroup>
        
        <Button>Sair</Button>
      </Navbar.Form>
    </Navbar.Collapse>
  </Navbar>
);

export default NavigationBar;
