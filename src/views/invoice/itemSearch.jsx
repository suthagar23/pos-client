import React, { Component } from 'react';
import { Grid, Row, Col, Table, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { searchForItem } from './itemSearchAction';

import Container from '../../components/container/container.jsx';
const thArray = ['Item Name', 'Price', 'Qty', 'Amount'];
const tdArray = [
  ['Dakota Rice', '$7', 2, '$14'],
  ['Minerva Hooper', '$2', 1, '$2'],
  ['Sage Rodriguez', '$5', 3, '$15'],
];


const mapStateToProps = (state, ownProps) => {
  return {cookies: ownProps.cookies, };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchForItem: itemData => dispatch(searchForItem(itemData))
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
      ValidationIssues: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }


  handleChange(event) {
    this.setState(Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
      ValidationIssues: {
        searchFieldValue: false,
      }}));
  }

  changeValidatorStates(isSearchFieldValue) {
    this.setState(Object.assign({}, this.state, {
      ...this.state,
      ValidationIssues: {
        searchFieldValue: isSearchFieldValue
      }
    }));
  } 

  submitForm(e) {
    console.log('Enter');
    e.preventDefault();
    const { searchFieldValue } = this.state;
    if (typeof searchFieldValue !== undefined && searchFieldValue) {
      let response = this.props.redux.actions.searchForItem(searchFieldValue);
      // console.log(response);
      if (response) {
        this.changeValidatorStates(false);
        document.getElementById('searchFieldValue').value = '';
        this.setState(Object.assign({}, this.state, {
          searchFieldValue: '',
          ValidationIssues: undefined}));
      }
      else {
        this.changeValidatorStates(true);
        document.getElementById('searchFieldValue').select()
      } 
    }
    else {
      this.changeValidatorStates(true);
    } 
  }

  getValidationState(fieldName) {
    if (fieldName && typeof this.state.ValidationIssues !== 'undefined') {
      return this.state.ValidationIssues[fieldName] ? 'error' : null;
    }
    return null;
  }


  render() {
    return (
      <Grid fluid>
        <form className="form" onSubmit={ (e) => this.submitForm(e) }>
          <Row>
            <Col md={12}>
              <FormGroup controlId="searchFieldValue"  validationState={this.getValidationState('searchFieldValue')}>
                <ControlLabel>Barcode ID/Item Code/Item Name</ControlLabel>
                <FormControl
                  type="text"
                  name="searchFieldValue"
                  value={this.state.value}
                  placeholder="Barcode ID/Item Code/Item Name"
                  onChange={this.handleChange}
                />                
              </FormGroup>
            </Col>
            <div className="clearfix" />
          </Row>
        </form>
      </Grid>
    );
  }
}

// export default ItemSearch;
const ItemSearchComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(ItemSearch);
export default ItemSearchComponent;