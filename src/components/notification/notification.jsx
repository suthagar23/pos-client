import React, { Component } from 'react';
import { Grid, Row, Col, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import styles from './style.css';
import {removeNotification} from './notificationAction';

const mapStateToProps = (state, ownProps) => {
  return {
    notificationList: state.notifications };
};

const mapDispatchToProps = (dispatch) => {
  return { 
    removeNotification: (notificationId) => dispatch(removeNotification(notificationId))
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

class Notifications extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleCloseClick = this.handleCloseClick.bind(this); 
  }

  componentDidUpdate() {

  }

  handleCloseClick(notificationId) {
    this.props.redux.actions.removeNotification(notificationId);
  }

  render() {
    const { notificationList } = this.props.redux.state;
    return (
      <div className='suthagar'>
        
        { notificationList.map((prop, key) => {
          return (<div role="alert" key={key} className={'alert alert-' + prop.notificationType + ' notification-top-right'}>
            <button type="button" className="close" onClick={() => this.handleCloseClick(prop.notificationId)}>✕</button>
            <span>{prop.notificationMessage}</span>
          </div>);
        }) }
       
      </div>
    );

  }
}

Notifications.propTypes = {
  redux: PropTypes.object.isRequired,
  redux: PropTypes.shape({
    state: PropTypes.object.isRequired,
    state: PropTypes.shape({
      notificationList: PropTypes.array.isRequired,
    }),
    actions: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      removeNotification: PropTypes.func.isRequired,
    })
  })
};
 
const NotificationsComponent = connect(mapStateToProps,mapDispatchToProps, mergeProps)(Notifications);
export default NotificationsComponent;
