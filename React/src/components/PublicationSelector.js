import React from 'react';
import { NavItem } from 'react-bootstrap';

const PublicationSelector = ({active, onClick, children}) => (
  <NavItem active={active} onClick={active ? null : onClick}>
    {children}
  </NavItem>
);

export default PublicationSelector;
