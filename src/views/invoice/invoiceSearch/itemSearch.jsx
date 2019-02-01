import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { updateInvoiceItemsList } from '../invoiceItems/InvoiceItemsAction';
import { FindItemByItemCode, searchForSuggestions } from '../invoiceSearch/invoiceSearchAction';
import { fetchGet } from '../../../utils/restMethods';
import Container from '../../../components/container/container.jsx';
import ItemSuggestion from '../../../components/itemSuggestion/itemSuggestion.jsx';
import * as constants from '../invoiceSearch/invoiceSearchConstants';

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
    activeIndex: state.invoiceItemSuggestions.activeIndex  };
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
      ValidationIssues: undefined,
      itemSuggestions : [

      ]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this); 
    this.handleEnterPress = this.handleEnterPress.bind(this);
  }

  handleKeyDown(event) {
    const pressedKeyCode = event.keyCode;
    const { dispatch } = this.props;
    // Pressed UP key
    if(pressedKeyCode === 38) {
      dispatch({type: 'SUGGESTION_POSITION_UP', payload: -1});
    }
    // Pressed Down key
    if(pressedKeyCode === 40) {
      dispatch({type: 'SUGGESTION_POSITION_DOWN', payload: 1});
    }

    if(pressedKeyCode === 13) {
      this.handleEnterPress();
    }
  }

  handleChange(event) {
    const searchValue = event.target.value;
    this.setState(Object.assign({}, this.state, {
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
      dispatch({type: 'REMOVE_ALL_ITEM_SUGGESTIONS', payload: []});
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
          let updateItemListResponse = actions.updateInvoiceItemsList(foundItem, state.invoiceItems);
  
          this.changeValidatorStates(false);
          (document.getElementById('searchFieldValue') || {}).value = '';
          this.setState(Object.assign({}, this.state, {
            searchFieldValue: '',
            ValidationIssues: undefined}));
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
    dispatch({type: 'REMOVE_ALL_ITEM_SUGGESTIONS', payload: []});
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
          <Col md={12}>
            <FormGroup controlId="searchFieldValue"  validationState={this.getValidationState('searchFieldValue')}>
              <ControlLabel>Item Code/Item Name</ControlLabel>
              <FormControl
                type="text"
                name="searchFieldValue"
                placeholder="Type Item Code/Item Name, then Press Enter"
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown} 
                value={this.state.itemSearch}
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
    }),
  })
};

// export default ItemSearch;
const ItemSearchComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(ItemSearch);
export default ItemSearchComponent;