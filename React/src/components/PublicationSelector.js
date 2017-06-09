import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

export default class PublicationSelector extends React.Component {
  render() {
    const { filter, onSelect } = this.props;

    return (
      <Nav className="publication-selector" bsStyle="tabs" justified
        activeKey={filter} onSelect={(key) => onSelect(key)}
      >
        <NavItem eventKey="ALL_PUBLICATIONS">
          Feed de publicações
        </NavItem>
        <NavItem eventKey="OWN_PUBLICATIONS">
          Minhas publicações
        </NavItem>
      </Nav>
    );
  }
};
