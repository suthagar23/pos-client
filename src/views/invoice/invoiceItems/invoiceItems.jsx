import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert, Button } from 'react-bootstrap';
import ItemSearch from '../invoiceSearch/itemSearch.jsx'; 
import InvoiceTotal from '../invoiceTotal/invoiveTotal.jsx';
import styles from './style.css';
import Container from '../../../components/container/container.jsx';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import {CURRENCY} from '../../../utils/constants';
import { DeleteAuthCookie, GetAuthCookie } from '../../../utils/authUtils';
import { findDifferFromToday } from '../../../utils/commonUtils';
import {checkForLoginStatus} from '../../../utils/authUtils';
import * as constants from './invoiceItemsConstants';
import { findNewOrders } from '../../orderList/orderAction';
import { saveSalesInvoice } from '../../sales/salesAction';
import { errorNotification, infoNotification } from '../../../components/notification/notificationAction';

const thArray = ['ItemCode', 'ItemName', 'Price', 'Qty', 'Amount'];

const mapStateToProps = (state, ownProps) => {
  return { invoiceItems: state.invoiceItems, 
    invoiceInfo: state.invoiceInfo };
};

const mapDispatchToProps = (dispatch) => {
  return {  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, {
    redux: {
      state: stateProps,
      actions: dispatchProps
    }
  });
};




class InvoiceItems extends Component {
  constructor() {
    super();
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }

  prepareArray() {
    const invoiceItems = this.props.redux.state.invoiceItems;
    let invoiceItemsArray = [];
    for (var itemId in invoiceItems) {
      if (invoiceItems.hasOwnProperty(itemId)) {
        const item = invoiceItems[itemId];
        invoiceItemsArray = [...invoiceItemsArray, [item.itemCode, item.itemName, item.unitPrice, item.quantity, item.amount, item._id]];
      }
    }
    return invoiceItemsArray;
  }

  componentDidMount() {
    checkForLoginStatus(this.props);
  }
 
  componentWillUnmount() {

    const thisInvoiceId = this.props.redux.state.invoiceInfo.invoiceId;
    if (typeof thisInvoiceId !== 'undefined' && Object.keys(this.props.redux.state.invoiceItems).length < 1 ) {
      let voidedOrder = saveSalesInvoice({}, {invoiceId: thisInvoiceId, invoiceStatus: 'CANCELLED_ORDER'});
      voidedOrder.then(function(response, error) {
        if(!error) {
          infoNotification('Your order has been cancelled. (#' + (thisInvoiceId || '') + ')');
        }
        else {
          errorNotification('Failed to cancel this order');
        }
      }.bind(this));
    }

  }

  handleRowClick(selectedItem) {
    const itemId = selectedItem[5];
    if(typeof itemId !== 'undefined') {
      (document.getElementById('searchFieldValue') || {}).value = selectedItem[1];
      (document.getElementById('quantityValue') || {}).value = selectedItem[3];
      const {dispatch} = this.props;
      dispatch({type:'UPDATE_INVOICE_INFO', payload: {invoiceFocusedItem_id: itemId}});
      (document.getElementById('quantityValue') || {}).select();
    }
  }

  handleRemoveClick(itemId) {
    const { dispatch } = this.props;
    dispatch({type : constants.REMOVE_UPDATED_LIST, payload: itemId});
  }

  render() {
    const { redux } = this.props;
    const {invoiceTitle, invoiceStartedAt, invoiceStartedByName } = redux.state.invoiceInfo;
    const title = invoiceTitle || 'New Invoice';
    const subTitle = 'Started : '.concat(invoiceStartedAt);
    const invoiceTotalItems = Object.keys(this.props.redux.state.invoiceItems || {}).length;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Container 
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <Row>
                      <Col md={12}>
                        <div className='invoice-header'>
                          <h3 className="sub-tile"> {title}</h3> 
                          <Row>
                            <Col md={6}>
                              <p className="sub-tile"><i className="fa  fa-clock-o"></i> {subTitle} </p>
                            </Col>
                            <Col md={6} style={{textAlign:'right'}}>
                              <p className="sub-tile"><i className="fa  fa-shopping-cart"></i> Total Items : {this.props.redux.state.invoiceInfo.invoiceTotalQuantity} quantity from {invoiceTotalItems} items.</p>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    <ItemSearch {...this.props}/>
                    <Table striped hover>
               
                      <thead style={{display : 'block'}}>
                        <tr style={{ width: '100%', display: 'table'}}>
                          {thArray.map((prop, key) => {
                            let textRight = '';
                            if (key !==0 && key !== 1) {
                              textRight = 'text-right';
                            }
                            return <th className={textRight + ' col' + prop} key={key}>{prop}</th>;
                          })}
                          <th className='colItemAction text-right'> Action </th>
                        </tr>
                      </thead>
                     
                      <tbody style={{display : 'block', maxHeight:'300px', overflowY: 'scroll'}}>
                        {this.prepareArray().map((item, key) => {
                         
                          return (
                            <tr key={key} style={{ width: '100%', display: 'table'}} onClick={() => this.handleRowClick(item)}>
                              {item.map((prop, key) => {
                                // let currencySymbol = CURRENCY;
                                let textRight = (key !== 0 && key !== 1) ? textRight = 'text-right' : textRight = '';
                                let currencySymbol = (key ===2 || key === 4) ? currencySymbol = CURRENCY : currencySymbol = '';

                                let returnDiv;
                                if (key !== 5) {
                                  returnDiv = <td className={textRight + ' col' + thArray[key]} key={key}>{currencySymbol} {prop}</td>;
                                }
                                else {
                                  returnDiv = (<td className={textRight + ' colItemAction'} key={key}>
                                    <Button bsStyle="danger" style={{ border: '0px', float: 'right'}} onClick={() => this.handleRemoveClick(prop)}> <i className="fa  fa-ban"></i> Remove </Button> 
                                  </td>);
                                }
                                return returnDiv;
                              })}
                            </tr>
                          );
                        })}
                      </tbody> 
                    </Table>

                    <InvoiceTotal {...this.props}/>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

InvoiceItems.propTypes = {
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      invoiceItems: PropTypes.object.isRequired,
      invoiceInfo: PropTypes.object.isRequired,
      invoiceInfo: PropTypes.shape({
        invoiceTotalQuantity: PropTypes.number,
      })
    }),
  }),
  dispatch: PropTypes.func.isRequired,
};

// export default InvoiceItems;
const InvoiceItemsComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(InvoiceItems);
export default InvoiceItemsComponent;