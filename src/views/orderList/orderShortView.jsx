import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as constants from '../../utils/constants';
import Button from '../../components/customButton/customButton.jsx';
import { connect } from 'react-redux';  
import {PATH_SALES, PATH_AUTH} from '../../routes/routesConstants';
import {findItemsOfAOrder} from './orderAction';
import { saveSalesInvoice } from '../sales/salesAction';
import { findNewOrders } from './orderAction';
import { errorNotification, successNotification } from '../../components/notification/notificationAction';
import { findDifferFromToday } from '../../utils/commonUtils';

const mapStateToProps = (state, ownProps) => {
  return {cookies: ownProps.cookies, };
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

class OrderShortView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceLastModifed: 0,
    };
    this.handleViewOrderClick = this.handleViewOrderClick.bind(this);
    this.handleVoidOrderClick = this.handleVoidOrderClick.bind(this);
  }

  handleViewOrderClick(selectedInvoiceId) {
    const { history, dispatch } = this.props;
    const { invoiceId, createdAt,  netAmount, discountAmount, modifitedAt } = this.props;
    const grossAmount = netAmount + discountAmount;
    let foundItems = findItemsOfAOrder(selectedInvoiceId);
    foundItems.then(function(response, error) {
      if(error) {
        errorNotification('Failed to fetch all order items');
      }
      else {
        const updatedInvoiceInfo = {
          grossAmount: grossAmount,
          discount : discountAmount,
          netAmount: netAmount,
        };
        let a = {};
        response.map((prop, key) => {
          a[prop._id] = {...prop, amount: (prop.quantity * prop.unitPrice || 0)};
        });

        dispatch({ type: 'UPDATE_INVOICE_INFO', payload: {invoiceTitle: 'Invoice #'.concat(invoiceId), 
          invoiceId: invoiceId,
          invoiceStartedAt: createdAt,
          invoiceModifitedAt: modifitedAt}});
        dispatch ({ type: 'ADD_UPDATED_LIST', payload: a });
        dispatch ({ type: 'UPDATE_GROSSAMOUNT', payload: updatedInvoiceInfo });
        history.push(PATH_SALES);
      }
      
    });
  }

  handleVoidOrderClick(selectedInvoiceId) {

    let voidedOrder = saveSalesInvoice({}, {invoiceId: selectedInvoiceId, invoiceStatus: 'CANCELLED_ORDER'});
    voidedOrder.then(function(response, error) {
      if(!error) {
        this.props.redux.actions.findNewOrders();
        successNotification('Successfully voided order (#' + (this.props.invoiceId || '') + ')');
      }
      else {
        errorNotification('Failed to void order');
      }
    }.bind(this));
  }
  

  componentDidMount(){
    let durationArray = findDifferFromToday(this.props.modifitedAt);
    this.setState({
      invoiceLastModifed :  durationArray[0].toString().concat(durationArray[1])
    });

    let durationSec = parseInt(durationArray[2] || 0);
    let durationValue = 1;
    if (durationSec > 60) {
      if (durationSec > 3600) {
        durationValue = 3600;
      }
      else {
        durationValue = 60;
      }
    }
    else {
      durationValue = 1;
    }
    this.durationInMinsInterval = setInterval( () => {
      durationArray = findDifferFromToday(this.props.modifitedAt);
      this.setState({
        invoiceLastModifed : durationArray[0].toString().concat(durationArray[1])
      });
    },durationValue * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.durationInMinsInterval);
  }

  render() {
    return (
      <Grid fluid>
        <Row>
          <Col md={12}>
            <div className='card' style={{padding:'10px'}}>
              <Row>
                <Col md={10}>
                  <Row>
                    <Col md={8}>
                      <div className='header'>
                        <p className="sub-tile"> Invoice <b>#{this.props.invoiceId || ''}</b></p>
                        <p className="sub-tile"><i className="fa  fa-toggle-right"></i>  Modified before {this.state.invoiceLastModifed || ''}</p>  
                        <p className="sub-tile"><i className="fa  fa-clock-o"></i> Created at {this.props.createdAt}</p>
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className='header'>
                        <h3 className="title" style={{textAlign:'right'}}>Net Total : {constants.CURRENCY} {this.props.netAmount}</h3>
                        <p className="sub-tile" style={{textAlign:'right'}}>Discount : {constants.DISCOUNT}% ({constants.CURRENCY} {this.props.discountAmount})</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col md={2} style={{borderLeft:'1px solid #ccc', paddingLeft: '40px'}}>
                  <Row>
                    <Button bsStyle="primary" pullcenter="true" fill onClick={() => this.handleViewOrderClick(this.props.invoiceId)}> <i className="fa  fa-external-link"></i> Open Order</Button>
                  </Row>
                  <Row>
                    <Button bsStyle="danger" pullcenter="true" fill onClick={() => this.handleVoidOrderClick(this.props.invoiceId)}> <i className="fa  fa-ban"></i> Void Order</Button>
                  </Row>
                </Col>
              </Row>
              <Row>
                
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

OrderShortView.propTypes = {
  invoiceId : PropTypes.string.isRequired,
  createdAt : PropTypes.string.isRequired,
  netAmount : PropTypes.number.isRequired,
  discountAmount : PropTypes.number.isRequired,
  modifitedAt : PropTypes.string.isRequired,
  history : PropTypes.object.isRequired,
  dispatch : PropTypes.func.isRequired,
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    actions: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      findNewOrders: PropTypes.func.isRequired,
    })
  })
};


const OrderShortViewComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(OrderShortView);
export default OrderShortViewComponent;