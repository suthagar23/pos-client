import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';

class HeaderLinks extends Component {
  render() { 
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            Sales
          </NavItem>
          <NavDropdown
            eventKey={2}
            title="Profile"
            id="basic-nav-dropdown-right">
            <MenuItem eventKey={2.1}>User Profile</MenuItem>
            <MenuItem eventKey={2.2}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Log out</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default HeaderLinks;
