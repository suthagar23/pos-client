import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import ItemSearch from './itemSearch.jsx'; 
import InvoiceTotal from './invoiveTotal.jsx';
import styles from './style.css';
import Container from '../../components/container/container.jsx';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import {CURRENCY} from "../../utils/constants";
const thArray = ['Name', 'Price', 'Qty', 'Amount'];

const tdArray = [
  ['Dakota Rice', '$7', 2, '$14'],
  ['Minerva Hooper', '$2', 1, '$2'],
  ['Sage Rodriguez', '$5', 3, '$15'],
  ['Dakota Rice', '$7', 2, '$14'], 
];


const mapStateToProps = (state, ownProps) => {
  return { invoiceItems: state.invoiceItems, cookies: ownProps.cookies, };
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
  }

  prepareArray() {
    const invoiceItems = this.props.redux.state.invoiceItems;
    let invoiceItemsArray = [];
    for (var itemId in invoiceItems) {
      if (invoiceItems.hasOwnProperty(itemId)) {
        const item = invoiceItems[itemId];
        invoiceItemsArray = [...invoiceItemsArray, [item.itemName, item.unitPrice, item.quantity, item.amount]];
      }
    }
    return invoiceItemsArray;
  }

  

  render() {
    const subTitle = "Started : ".concat(new Date()).concat(' by @').concat('user')
    console.log(subTitle);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Container
                title="Invoice #1230"
                subTitle="Started : 12/01/2019 14:23:24 by @ram"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                    <ItemSearch />
                    <Table striped hover>
               
                      <thead style={{display : 'block'}}>
                        <tr style={{ width: '100%', display: 'table'}}>
                          {thArray.map((prop, key) => {
                            let textRight = '';
                            if (key !==0) {
                              textRight = 'text-right';
                            }
                            return <th className={textRight + ' col' + prop} key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                     
                      <tbody style={{display : 'block', maxHeight:'300px', overflowY: 'scroll'}}>
                        {this.prepareArray().map((prop, key) => {
                         
                          return (
                            <tr key={key} style={{ width: '100%', display: 'table'}}>
                              {prop.map((prop, key) => {
                                // let currencySymbol = CURRENCY;
                                let textRight = (key !==0) ? textRight = 'text-right' : textRight = '';
                                let currencySymbol = (key ===1 || key === 3) ? currencySymbol = CURRENCY : currencySymbol = '';

                               
                               
                                return <td className={textRight + ' col' + thArray[key]} key={key}>{currencySymbol} {prop}</td>;
                              })}
                            </tr>
                          );
                        })}
                      </tbody> 
                    </Table>

                    <InvoiceTotal />
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

// export default InvoiceItems;
const InvoiceItemsComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(InvoiceItems);
export default InvoiceItemsComponent;