import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { updateInvoiceItemsList } from '../invoiceItems/InvoiceItemsAction';
import { FindItemByItemCode, searchForSuggestions } from '../invoiceSearch/invoiceSearchAction';
import { fetchGet } from '../../../utils/restMethods';
import Container from '../../../components/container/container.jsx';
import ItemSuggestion from '../../../components/itemSuggestion/itemSuggestion.jsx';
import * as constants from './invoiceSearchConstants';
import { errorNotification } from '../../../components/notification/notificationAction';

const thArray = ['Item Name', 'Price', 'Qty', 'Amount'];
const tdArray = [
  ['Dakota Rice', '$7', 2, '$14'],
  ['Minerva Hooper', '$2', 1, '$2'],
  ['Sage Rodriguez', '$5', 3, '$15'],
];


const mapStateToProps = (state, ownProps) => {
  return {cookies: ownProps.cookies, 
    invoiceItems: state.invoiceItems,
    invoiceItemSuggestions: state.invoiceItemSuggestions.suggestions,
    activeIndex: state.invoiceItemSuggestions.activeIndex,
    invoiceFocusedItem_id: state.invoiceInfo.invoiceFocusedItem_id,  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // searchForItem: itemData => dispatch(searchForItem(itemData)),
    searchForSuggestions: searchValue => dispatch(searchForSuggestions(searchValue)),
    updateInvoiceItemsList: (newItemObject, invoiceItems) => dispatch(updateInvoiceItemsList(newItemObject, invoiceItems))
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


class ItemSearch extends Component {
  constructor() {
    super();
    this.state = {
      searchFieldValue: '',
      quantityValue: 1,
      ValidationIssues: undefined,
      itemSuggestions : [

      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this); 
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleQuantityFieldKeyDown = this.handleQuantityFieldKeyDown.bind(this); 
    this.handleQuantityFieldEnterPress = this.handleQuantityFieldEnterPress.bind(this);
    this.handleQuantiyFieldChange = this.handleQuantiyFieldChange.bind(this);
    this.validateQuantityKeyPress = this.validateQuantityKeyPress.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    (document.getElementById('searchFieldValue') || {}).select();
  }

  handleKeyDown(event) {
    const pressedKeyCode = event.keyCode;
    const { dispatch } = this.props;
    // Pressed UP key
    if(pressedKeyCode === 38) {
      dispatch({type: constants.SUGGESTION_POSITION_UP, payload: -1});
    }
    // Pressed Down key
    if(pressedKeyCode === 40) {
      dispatch({type: constants.SUGGESTION_POSITION_DOWN, payload: 1});
    }

    if(pressedKeyCode === 13) {
      this.handleEnterPress();
    }
  }

  validateQuantityKeyPress(event) {
    if (event.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
    } else {
      var key = event.keyCode || event.which;
      key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      event.returnValue = false;
      if(event.preventDefault) event.preventDefault();
    }
  }

  handleQuantityFieldKeyDown(event) {
    if(event.keyCode === 13) {
      this.handleQuantityFieldEnterPress();
    }
  }

  handleQuantityFieldEnterPress() {
    let { quantityValue } = this.state; 
    
    let { invoiceFocusedItem_id, invoiceItems } = this.props.redux.state;
    let focusedItem = invoiceItems[invoiceFocusedItem_id];
    const { actions, state } = this.props.redux;
    if (focusedItem) { 
      let enteredItemQuantity = 1;
      try {
        enteredItemQuantity = parseInt(this.state.quantityValue);
      }
      catch(err) {
        this.incorrectQuantityValidationError();
      }
    
      if (enteredItemQuantity > 0) {
        if ( typeof this.state.quantityValue !== undefined) {
          focusedItem.quantity = enteredItemQuantity;
        }

        let updateItemListResponse = actions.updateInvoiceItemsList(focusedItem, state.invoiceItems);

        this.changeValidatorStates(false);
        (document.getElementById('searchFieldValue') || {}).value = '';
        (document.getElementById('quantityValue') || {}).value = 1;
        this.setState(Object.assign({}, this.state, {
          searchFieldValue: '',
          quantityValue : 1,
          ValidationIssues: undefined}));
        (document.getElementById('searchFieldValue') || {}).select();
      }
      else {
        this.incorrectQuantityValidationError();
      }
    }
    else {
      this.changeValidatorStates(true);
      (document.getElementById('quantityValue') || {}).select();
    } 

  }

  incorrectQuantityValidationError() {
    this.setState(Object.assign({}, this.state, {
      ...this.state,
      ValidationIssues: {
        quantityValue: true
      }
    }));
    (document.getElementById('quantityValue') || {}).select();
    errorNotification(constants.QUANTIY_LESS_THAN_ONE_ERROR);
  }

  handleQuantiyFieldChange(event) {
    const quantityValue = event.target.value;
    this.setState(Object.assign({}, this.state, {
      ...this.state,
      [event.target.name]: quantityValue,
      ValidationIssues: {
        searchFieldValue: false,
        quantityValue: false,
      }}));
  }

  handleChange(event) {
    const searchValue = event.target.value;
    this.setState(Object.assign({}, this.state, {
      ...this.state,
      [event.target.name]: searchValue,
      ValidationIssues: {
        searchFieldValue: false,
      }}));
    if(searchValue) {
      const { actions } = this.props.redux;
      let searchResponse = actions.searchForSuggestions(searchValue);
    }
    else {
      const { dispatch } = this.props;
      dispatch({type: constants.REMOVE_ALL_ITEM_SUGGESTIONS, payload: []});
    }
  }

  changeValidatorStates(isSearchFieldValue) {
    this.setState(Object.assign({}, this.state, {
      ...this.state,
      ValidationIssues: {
        searchFieldValue: isSearchFieldValue
      }
    }));
  } 

  handleEnterPress() { 
    // e.preventDefault();
    let { searchFieldValue } = this.state; 
    const { activeIndex, invoiceItemSuggestions } = this.props.redux.state;
    if (activeIndex > constants.DEFAULT_ACTIVE_INDEX) {
      searchFieldValue = invoiceItemSuggestions[activeIndex].itemCode;
    } 
    if (typeof searchFieldValue !== undefined && searchFieldValue) {
      const { actions, state } = this.props.redux;
      let searchResponse = FindItemByItemCode(searchFieldValue);
      searchResponse.then(function(foundItem ,err) { 
        if (foundItem) { 
          let { invoiceItems } = this.props.redux.state;
          let currentAddedItem = invoiceItems[foundItem._id];
          if (currentAddedItem !== undefined) {
            foundItem.quantity = currentAddedItem.quantity;
          }
          else {
            foundItem.quantity = 1;
          }
          let updateItemListResponse = actions.updateInvoiceItemsList(foundItem, state.invoiceItems);
          this.changeValidatorStates(false);
          (document.getElementById('searchFieldValue') || {}).value = foundItem.itemName || '';
          this.setState(Object.assign({}, this.state, {
            searchFieldValue: '',
            ValidationIssues: undefined}));
          (document.getElementById('quantityValue') || {}).value = foundItem.quantity || 1;
          (document.getElementById('quantityValue') || {}).select();
        }
        else {
          this.changeValidatorStates(true);
          (document.getElementById('searchFieldValue') || {}).select();
        } 

      }.bind(this));

    }
    else {
      this.changeValidatorStates(true);
    }
    
    const { dispatch } = this.props;
    dispatch({type: constants.REMOVE_ALL_ITEM_SUGGESTIONS, payload: []});
  }

  getValidationState(fieldName) {
    if (fieldName && typeof this.state.ValidationIssues !== 'undefined') {
      return this.state.ValidationIssues[fieldName] ? 'error' : null;
    }
    return null;
  }


  render() {

    let itemSuggestionStyle = {
      position: 'absolute',
      width: '100%',
      marginTop: '-25px',
      zIndex: '999'
    };
    return (
      <Grid fluid>
        <Row>
          <Col md={9}>
            <FormGroup controlId="searchFieldValue"  validationState={this.getValidationState('searchFieldValue')}>
              <ControlLabel>Item Code/Item Name</ControlLabel>
              <FormControl
                type="text"
                name="searchFieldValue"
                placeholder="Type Item Code/Item Name, then Press Enter"
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown} 
                onClick={this.handleOnClick}
                value={this.state.itemSearch}
                autoComplete="off"
              />                
            </FormGroup>
          </Col>  
          <Col md={3}>
            <FormGroup controlId="quantityValue" validationState={this.getValidationState('quantityValue')}>
              <ControlLabel>Quantity</ControlLabel>
              <FormControl
                type="text"
                name="quantityValue"
                placeholder="Quantity"
                onChange={this.handleQuantiyFieldChange}
                onKeyDown={this.handleQuantityFieldKeyDown}
                value={this.state.itemQty}
                onKeyPress={this.validateQuantityKeyPress}
                defaultValue={1}
                autoComplete="off"
              />                
            </FormGroup>
          </Col>  
          <div className="clearfix" />
        </Row>
        <Row style={itemSuggestionStyle}>
          <Col md={12}>
            <ItemSuggestion {...this.props} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

ItemSearch.propTypes = {
  cookies : PropTypes.object.isRequired,
  redux: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  redux: PropTypes.shape({
    state: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    state: PropTypes.shape({
      activeIndex: PropTypes.number.isRequired,
      invoiceItemSuggestions: PropTypes.array.isRequired, 
      invoiceFocusedItem_id: PropTypes.string.isRequired, 
      invoiceItems: PropTypes.object.isRequired,
    }),
  })
};

// export default ItemSearch;
const ItemSearchComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(ItemSearch);
export default ItemSearchComponent;