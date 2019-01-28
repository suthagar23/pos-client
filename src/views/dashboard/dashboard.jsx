import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LOGIN_REQUIRED, RELOGIN_REQUIRED} from '../login/loginConstants';
import { GetAuthCookie } from '../../utils/authUtils';
import PropTypes from 'prop-types';
import { Grid, Row, Col} from 'react-bootstrap';
import Container from '../../components/container/container.jsx';
import styles from './style.css';
import  InvoiceItems from '../invoice/invoiceItems.jsx';
import ItemSearch from '../invoice/itemSearch.jsx';

const mapStateToProps = (state, ownProps) => {
  return { cookies: ownProps.cookies, 
    currentURL: ownProps.location.pathname,
    isLogedIn : state.auth.logedIn };
};


class Dashboard extends Component {
  constructor() {
    super(); 
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { cookies } = this.props;
    const {isLogedIn, userInfo} = GetAuthCookie(cookies) || {};
    if (typeof isLogedIn === 'undefined') {
      dispatch({type: LOGIN_REQUIRED});
      this.props.history.push('/auth');
    }
    else if (typeof userInfo === 'undefined') {
      dispatch({type: RELOGIN_REQUIRED});
      this.props.history.push('/auth');
    }
    // else {
    //   if(!this.props.state.redux.auth.isLogedIn) {
    //     const { cookies, history, dispatch } = this.props;
    //     const {isLogedIn, userInfo} = GetAuthCookie(cookies) || {};
    //     dispatch({ type: constants.AUTHENTICATEION_SUCCESS, payload:  { isLogedIn : true, userInfo: userInfo } });
    //   }
    // }
  }

  render() {
   
    return (
      <div className='bill-content'>
       
        <InvoiceItems />
      </div>
     
    // <div className="content content-updated">
    //   <Grid fluid className={'container-fluid-updated'}>
    //     <Row>
    //       <Col md={12} className={'loginCardStyle'}>
    //         <Container
    //           content={
    //             <TableList />
    //           }
    //         />
    //       </Col>
    //     </Row>
    //   </Grid>
    // </div>
    );
  }
}

Dashboard.propTypes = {
  cookies : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired,
};

// export default Dashboard;
const DashboardComponent = connect(mapStateToProps)(Dashboard);
export default DashboardComponent;