import React, { Component } from 'react';
import { NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';  
import { formatDateTime } from '../../utils/commonUtils';
import PropTypes from 'prop-types';
import { DeleteAuthCookie } from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return {auth: state.auth, };
};


class HeaderLinks extends Component {
  constructor(props) {
    super(props); 
    this.handleNewSalesClick = this.handleNewSalesClick.bind(this);
  }

  handleNewSalesClick(){
    const { dispatch, auth } = this.props; 
    const { firstName: loggedInUserFirstName, _id: loggedInUserId} = auth.user || {};
    // Need to refactor
    let startedDateTime = formatDateTime(new Date());
       
    dispatch({type: 'RESET_SUGGESTION_ITEMS', payload: null});
    dispatch({type: 'RESET_INVOICE_ITEMS', payload: null});
    dispatch({type: 'RESET_INVOICE_TOTAL', payload: null});

    dispatch({ type: 'UPDATE_INVOICE_INFO', payload: {
      invoiceTitle: 'New Invoice',
      invoiceStartedAt: startedDateTime,
      invoiceStartedByName: loggedInUserFirstName,
      invoiceStartedById: loggedInUserId,
      invoiceStatus: 'NEW_ORDER',
    }});
  }

  handleLogOut() {
    DeleteAuthCookie();
  }

  render() { 
    return (
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="#/orderlist">Active Orders</NavItem>
          <NavItem eventKey={1} onClick={this.handleNewSalesClick} href="#/sales">New Invoice</NavItem>

          <NavItem eventKey={3} onClick={this.handleLogOut} href="#/logout">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

HeaderLinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const HeaderLinksComponetn = connect(mapStateToProps)(HeaderLinks);
export default HeaderLinksComponetn;


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

