import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import Container from '../../components/container/container.jsx'; 
import Button from '../../components/customButton/customButton.jsx';
import { validateUserLoginForm } from './loginAction';
import { authenticateUser } from '../../utils/authUtils';
import { connect } from 'react-redux';
import * as constants from './loginConstants';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'; 
import { DeleteAuthCookie, GetAuthCookie } from '../../utils/authUtils';
import {PATH_SALES, PATH_AUTH} from '../../routes/routesConstants';

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, cookies: ownProps.cookies, };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (userLoginData, cookies) => dispatch(authenticateUser(userLoginData, cookies)),
    validateUserLoginForm: userLoginData => dispatch(validateUserLoginForm(userLoginData))
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


class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      ValidationIssues: undefined
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  
  componentDidMount() {  
    const { cookies, history } = this.props;
    const {isLogedIn, userInfo} = GetAuthCookie(cookies) || {};
    if (typeof isLogedIn !== 'undefined' && typeof userInfo !== 'undefined') {
      history.push(PATH_SALES);
    }
    else {
      DeleteAuthCookie(cookies);
    }
  }
 
  handleChange(event) {
    this.setState(Object.assign({}, this.state, {
      [event.target.name]: event.target.value,
      ValidationIssues: {
        userName: false,
        password: false
      }}));
  }

  ChangeValidatorStates(isUserNameCorrect, isPasswordCorrect){
    this.setState(Object.assign({}, this.state, {
      ValidationIssues: {
        userName: isUserNameCorrect,
        password: isPasswordCorrect
      }}));
  }

  submitForm(e) {
    e.preventDefault();
    const { cookies, redux } = this.props;this.setState(Object.assign({}, this.state, {
      ...this.state,
      ValidationIssues: {
        searchFieldValue: true
      }
    }));
    const {validator, ...resBody} = this.state;
    const validated = redux.actions.validateUserLoginForm(resBody);
    if (typeof validated !== 'undefined') {
      switch (validated.type) {
      case constants.AUTHENTICATE:
        this.ChangeValidatorStates(false, false);
        this.props.redux.actions.authenticateUser(resBody, cookies);
      case constants.USERNAME_PASSWORD_REQUIRED || constants.LOGIN_REQUIRED:
        this.ChangeValidatorStates(true, true);
      case constants.USERNAME_REQUIRED:
        this.ChangeValidatorStates(true, false);
      case constants.PASSWORD_REQUIRED:
        this.ChangeValidatorStates(false, true);
      default:
        this.ChangeValidatorStates(false, false);
      }
    }
  }
    
  getValidationState(fieldName) {
    if (fieldName && typeof this.state.ValidationIssues !== 'undefined') {
      if (this.state[fieldName]) return null;
      if (this.state.ValidationIssues[fieldName]) return 'error';
      return 'success';
    }
    return null;
  }



  render() {
    const loginCardStyle = {
      float: 'none',
      margin: '0 auto'
    };
    
    const showAlerts = (alertTyle, message) => {
      return (<Alert bsStyle={alertTyle}> { message }</Alert>);
    };

    const UpdateLoginStatus = () => {
      const state_AuthObject = this.props.redux.state.auth;
      if (typeof state_AuthObject.error !== 'undefined') {
        return showAlerts('danger', ( state_AuthObject.error.message|| 'Unknown error'));
      }
      else if (typeof state_AuthObject.success !== 'undefined') {
        const { user } = state_AuthObject;
        if (user) {
          return (
            <div>
              <Redirect to={PATH_SALES} /> 
              {showAlerts('success', ( state_AuthObject.success.message|| 'Success'))}
            </div>);
        }
        else {
          return showAlerts('danger', 'Unknown error, Please try again');
        }

      }
      return (null);
    };

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={5} style={loginCardStyle}>
              <Container
                title="Login"
                content={
                  <form className="form" onSubmit={ (e) => this.submitForm(e) }>
                     
                    <UpdateLoginStatus />

                    <FormGroup controlId="userName" validationState={this.getValidationState('userName')}>
                      <ControlLabel>Username</ControlLabel>
                      <FormControl
                        type="text"
                        name="userName"
                        value={this.state.value}
                        placeholder="Enter your username"
                        onChange={this.handleChange}
                      />                
                    </FormGroup>
                    
                    <FormGroup controlId="password" validationState={this.getValidationState('password')}>
                      <ControlLabel>Password</ControlLabel>
                      <FormControl
                        type="password"
                        name="password"
                        value={this.state.value}
                        placeholder="Enter your password"
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                
                    <Button bsStyle="info" pullRight fill type="submit">
                      Login
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    actions: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      authenticateUser: PropTypes.func.isRequired,
      validateUserLoginForm:  PropTypes.func.isRequired,
    }),
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      auth: PropTypes.object.isRequired,
      auth: PropTypes.shape({
        logedIn: PropTypes.bool.isRequired
      })
    })
  }),
  cookies : PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
};

const LoginComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(Login);
export default LoginComponent;
