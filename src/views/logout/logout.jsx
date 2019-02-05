import React, { Component } from 'react';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import Container from '../../components/container/container.jsx'; 
import Button from '../../components/customButton/customButton.jsx';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';  
import Login from '../login/loginView.jsx';
import { DeleteAuthCookie } from '../../utils/authUtils';

const mapStateToProps = (state, ownProps) => {
  return { auth: state.auth, 
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, {
    redux: {
      state: stateProps,
      actions: dispatchProps
    }
  });
};


class Logout extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    DeleteAuthCookie();
  }

  render() {

    return (
      <div className="content">
        <Grid>
          <Row>
            <Col md={12}>
              <h2 style={{textAlign: 'center'}}> Thanks for your time !! </h2>
              <p style={{textAlign: 'center', paddingBottom: '20px'}}> You have successfully logout from the system. </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Logout.propTypes = {
  redux: PropTypes.object.isRequired,
  history : PropTypes.object.isRequired,
};

const LogoutComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(Logout);
export default LogoutComponent;
