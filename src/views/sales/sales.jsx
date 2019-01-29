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

const mapStateToProps = (state, ownProps) => {
  return { cookies: ownProps.cookies, 
    currentURL: ownProps.location.pathname,
    auth : state.auth, };
};


class Sales extends Component {
  constructor() {
    super(); 
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { cookies } = this.props;
    const {isLogedIn, userInfo} = GetAuthCookie(cookies) || {};
    if (typeof isLogedIn === 'undefined') {
      dispatch({type: LOGIN_REQUIRED});
      this.props.history.push(PATH_AUTH);
    }
    else if (typeof userInfo === 'undefined') {
      dispatch({type: RELOGIN_REQUIRED});
      this.props.history.push(PATH_AUTH);
    }
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
  cookies : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired,
};
 
const SalesComponent = connect(mapStateToProps)(Sales);
export default SalesComponent;