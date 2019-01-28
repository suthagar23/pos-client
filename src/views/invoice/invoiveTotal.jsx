import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import Container from '../../components/container/container.jsx';
import * as constants from "../../utils/constants";
// import * as constants from './itemSearchConstants';

import {calculateTotal} from "./invoiceTotalAction";

const mapStateToProps = (state, ownProps) => {
  return { invoiceItems: state.invoiceItems,
    invoiceInfo : state.invoiceInfo,
     cookies: ownProps.cookies, };
};

const mapDispatchToProps = (dispatch) => {
  return {
    calculateTotal: (invoiceItems, invoiceInfo) => dispatch(calculateTotal(invoiceItems, invoiceInfo))
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


class InvoiceTotal extends Component {
  constructor() {
    super();
    this.state = {
      grossAmount:0,
      isAlreadyGrossAmountCalculated: false,
    };
  }

  componentDidUpdate() {
    const {invoiceItems, invoiceInfo} = this.props.redux.state;
    this.props.redux.actions.calculateTotal(invoiceItems, invoiceInfo);
  }

  render() {
    const {invoiceGrossAmount, invoiceDiscount, invoiceNetAmount} = this.props.redux.state.invoiceInfo;
    return (
      <div className={'card  card-plain'}>
        <div className={'header text-right'}>
          <p className="category">Gross Amount : {constants.CURRENCY} {invoiceGrossAmount}</p>
          <p className="category">Discount : {constants.DISCOUNT || 0}% ({constants.CURRENCY} {invoiceDiscount})</p>
          <h4 className="title">Net Amount : {constants.CURRENCY} {invoiceNetAmount}</h4>
          
        </div>
      </div>
    );
  }
}

// export default InvoiceTotal;
const InvoiceTotalComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(InvoiceTotal);
export default InvoiceTotalComponent;