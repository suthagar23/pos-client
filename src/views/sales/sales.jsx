import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LOGIN_REQUIRED, RELOGIN_REQUIRED} from '../login/loginConstants';
import { GetAuthCookie } from '../../utils/authUtils';
import PropTypes from 'prop-types';
import { Grid, Row, Col} from 'react-bootstrap';
import Container from '../../components/container/container.jsx';
import styles from './style.css';
import  InvoiceItems from '../invoice/invoiceItems/invoiceItems.jsx';
import {PATH_SALES, PATH_AUTH} from '../../routes/routesConstants';
import {checkForLoginStatus} from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return { 
    currentURL: ownProps.location.pathname,
    auth : state.auth, };
};


class Sales extends Component {
  constructor() {
    super(); 
  }

  componentWillUnmount() {
 
  }

  render() {
   
    return (
      <div className='bill-content'>
        <InvoiceItems {...this.props}/>
      </div>
    );
  }
}

Sales.propTypes = {
  history : PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired,
};
 
const SalesComponent = connect(mapStateToProps)(Sales);
export default SalesComponent;