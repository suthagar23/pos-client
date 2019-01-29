import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import ItemSearch from '../invoiceSearch/itemSearch.jsx'; 
import InvoiceTotal from '../invoiceTotal/invoiveTotal.jsx';
import styles from './style.css';
import Container from '../../../components/container/container.jsx';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import {CURRENCY} from '../../../utils/constants';
import { DeleteAuthCookie, GetAuthCookie } from '../../../utils/authUtils';

const thArray = ['ItemCode', 'ItemName', 'Price', 'Qty', 'Amount'];
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
        invoiceItemsArray = [...invoiceItemsArray, [item.itemCode, item.itemName, item.unitPrice, item.quantity, item.amount]];
      }
    }
    return invoiceItemsArray;
  }

  

  render() {
    const { cookies } = this.props;
    const {userInfo} = GetAuthCookie(cookies) || {};
    let logedInUserFirstName = 'user';
    if (typeof userInfo !== 'undefined') {
      logedInUserFirstName = userInfo.firstName;
    }
    // Need to refactor
    let [date, time] = new Date().toLocaleString('en-US').split(', ');
    let startedDateTime = date.concat(' ').concat(time);
    const subTitleInfo = 'Started : '.concat(startedDateTime).concat(' by @').concat(logedInUserFirstName);

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Container
                title="Invoice #1230"
                subTitle={subTitleInfo}
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
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
                        </tr>
                      </thead>
                     
                      <tbody style={{display : 'block', maxHeight:'300px', overflowY: 'scroll'}}>
                        {this.prepareArray().map((prop, key) => {
                         
                          return (
                            <tr key={key} style={{ width: '100%', display: 'table'}}>
                              {prop.map((prop, key) => {
                                // let currencySymbol = CURRENCY;
                                let textRight = (key !== 0 && key !== 1) ? textRight = 'text-right' : textRight = '';
                                let currencySymbol = (key ===2 || key === 4) ? currencySymbol = CURRENCY : currencySymbol = '';

                               
                               
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

InvoiceItems.propTypes = {
  cookies : PropTypes.object.isRequired,
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      invoiceItems: PropTypes.object.isRequired,
    })
  })
};

// export default InvoiceItems;
const InvoiceItemsComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(InvoiceItems);
export default InvoiceItemsComponent;