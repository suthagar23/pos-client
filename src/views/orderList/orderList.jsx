import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LOGIN_REQUIRED, RELOGIN_REQUIRED} from '../login/loginConstants';
import { GetAuthCookie } from '../../utils/authUtils';
import PropTypes from 'prop-types';
import { Grid, Row, Col} from 'react-bootstrap';
import Container from '../../components/container/container.jsx';
// import styles from './style.css';
import  InvoiceItems from '../invoice/invoiceItems/invoiceItems.jsx';
import {PATH_SALES, PATH_AUTH} from '../../routes/routesConstants';
import { findNewOrders } from './orderAction';
import * as constants from '../../utils/constants';
import OrderShortView from './orderShortView.jsx';
import Card from '../../components/container/container.jsx';
import { formatDateTime } from '../../utils/commonUtils';
import {checkForLoginStatus} from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return { 
    auth : state.auth,
    orderLists: state.orderLists };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findNewOrders: () => dispatch(findNewOrders())
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, {
    redux: {
      state: stateProps,
      actions: dispatchProps
    }
  });
};


class OrderList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    checkForLoginStatus(this.props);
    this.props.redux.actions.findNewOrders();
  }

  render() {
    const { orderLists } = this.props.redux.state;
    let orderListTitle = 'Active Orders';
    if (orderLists.length < 1) {
      orderListTitle = 'No active orders.';
    }
    else {
      orderListTitle = orderLists.length === 1 ? '1 Active order' : orderLists.length + ' Active Orders';
    }
    return (
      <div className="content"  >
        <Grid fluid>
          <Row  >
            <Col md={12}  >
              <Card  
                title={orderListTitle}
                subTitle=""
                ctTableFullWidth 
                ctTableResponsive 
                className='suggestions-contents'
                content=
                  { <div>
                    {orderLists.map((prop, key) => {
                      return <OrderShortView {...this.props} key={key} netAmount={prop.orderNetAmount} 
                        invoiceId={prop._id} 
                        discountAmount={prop.orderDiscount} 
                        createdAt={ formatDateTime(prop.orderStartedDate)}
                        modifitedAt={ formatDateTime(prop.lastModifiedAt)}/>;
                        
                    })}</div>
                  } >
      
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

OrderList.propTypes = {
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      orderLists: PropTypes.array.isRequired,
    }),
    actions: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      findNewOrders: PropTypes.func.isRequired,
    })
  })
};
 
const OrderListComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(OrderList);
export default OrderListComponent;