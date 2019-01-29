import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

export class HeaderLinks extends Component {
  render() { 
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="#/orders">Orders</NavItem>
          <NavItem eventKey={1} href="#/sales">Sales</NavItem>
          <NavDropdown
            eventKey={2}
            title="Profile"
            id="basic-nav-dropdown-right">
            <MenuItem eventKey={2.1}>User Profile</MenuItem>
            <MenuItem eventKey={2.2}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Log out</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#/logout">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export class LoginLinks extends Component {
  render() { 
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="#/auth">
            Log in
          </NavItem>
        </Nav>
      </div>
    );
  }
}

