import React, { Component } from 'react';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import {CURRENCY} from '../../utils/constants';
import styles from './style.css';
import Card from '../container/container.jsx';
const thArray = ['ItemCode', 'Name', 'Description', 'UnitPrice'];

const mapStateToProps = (state, ownProps) => {
  return {
    invoiceItemSuggestions: state.invoiceItemSuggestions.suggestions,
    activeIndex: state.invoiceItemSuggestions.activeIndex };
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

class ItemSuggestion extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this); 
  }

  componentDidUpdate() {

  }

  handleClick(value) {

  }

  render() {
    let itemSuggestions = this.props.redux.state.invoiceItemSuggestions;
    let activeItemIndex = this.props.redux.state.activeIndex;
    if (itemSuggestions && itemSuggestions.length > 0) {
      return (
        <div className="content" style={{paddingTop: '0px'}}>
          <Grid fluid>
            <Row style={{paddingTop: '0px'}}>
              <Col md={12} style={{paddingTop: '0px'}}>
                <Card  
                  subTitle="Similar Items found for you,"
                  ctTableFullWidth 
                  ctTableResponsive 
                  style={{paddingTop: '0px'}}
                  className='suggestions-contents'
                  content={
                    <Table hover>
                      <thead>
                        <tr>
                          {thArray.map((prop, key) => {
                            return <th className='suggestions-header' key={key}>{prop}</th>;
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {itemSuggestions.map((prop, key) => {
                          return (
                            <tr key={key}  className={activeItemIndex === key ? 'suggestion-pointer selected-row' : 'suggestion-pointer'}>
                              <td> {prop.itemCode}</td>
                              <td> <b>{prop.itemName} </b> </td>
                              <td> {prop.itemDescription}</td>
                              <td> {CURRENCY} {prop.unitPrice}</td> 
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  }
                />
              </Col>

          
            </Row>
          </Grid>
        </div>
      );
    }
    else {
      return (null); 
    }
  }
}

ItemSuggestion.propTypes = {
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      invoiceItemSuggestions: PropTypes.array.isRequired,
      activeIndex: PropTypes.number.isRequired
    })
  })
};
 
const ItemSuggestionComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(ItemSuggestion);
export default ItemSuggestionComponent;
