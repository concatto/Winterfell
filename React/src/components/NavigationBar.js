import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar, Form, FormGroup, InputGroup, FormControl, Button, Image, Glyphicon } from 'react-bootstrap';
import { createProfileHref } from '../utils';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      small: (window.innerWidth < 768),
      expanded: false
    };

    this.handleResize = () => {
      //Bootstrap xs
      this.setState({small: (window.innerWidth < 768)});
    };
  }

  componentDidMount() {
    if (this.props.shouldFetch) {
      this.props.fetchUser(this.props.id);
    }
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearch(this.input.value);
  }

  computeClassname() {
    let name = "pull-right";
    if (this.state.small) {
      name += " phone-navbar";
    }
    if (this.state.expanded) {
      name += " expanded";
    }
    return name;
  }

  handleSearchClick() {
    if (this.state.small && !this.state.expanded) {
      this.setState({expanded: true});
    }
  }

  componentDidUpdate() {
    if (this.state.expanded) {
      this.input.focus();
    }
  }

  render() {
    const { id, avatar, name, withSearch, onLogout } = this.props;

    return (
      <Navbar fixedTop fluid>
        <Navbar.Header className={this.state.expanded ? "hidden" : ""}>
          {id !== undefined &&
            <Link to={createProfileHref(id)}>
              <Navbar.Brand>
                <Image src={avatar} circle/>
                <span>{name}</span>
              </Navbar.Brand>
            </Link>
          }
        </Navbar.Header>

        <div className={this.computeClassname()}>
          <Button onClick={() => onLogout()} className="navbar-btn">Sair</Button>
          <Navbar.Form>
            <Form onSubmit={(e) => this.handleSubmit(e)}>
              {withSearch &&
                <FormGroup>
                  <InputGroup>
                    <FormControl type="text" placeholder="Pesquisar pessoas"
                      onBlur={() => this.setState({expanded: false})}
                      inputRef={(r) => this.input = r}
                    />
                    <InputGroup.Addon onClick={(e) => this.handleSearchClick()}>
                      <Glyphicon glyph="search"/>
                    </InputGroup.Addon>
                  </InputGroup>
                </FormGroup>
              }
            </Form>
          </Navbar.Form>
        </div>
      </Navbar>
    );
  }
}
