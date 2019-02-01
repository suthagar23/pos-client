
import store from '../../store/index';

export function addNotification(type, message) {
  if (type.toLowerCase() in ['danger, success', 'info']) {
    type = 'info';
  }
  let notification = {
    notificationId: new Date().getTime(),
    notificationType: type,
    notificationMessage: message,
    notificationCloseButton: true,
    notificationDisplayed: false,
  };
  store.dispatch({type: 'ADD_NOTIFICATION', payload: notification});
  setTimeout(() => 
    store.dispatch({type: 'REMOVE_NOTIFICATION', payload: notification.notificationId}), 4000);
  return notification;
}

export function errorNotification(message) {
  return addNotification('danger', message);
}

export function successNotification(message) {
  return addNotification('success', message);
}

export function removeNotification(notificationId) {
  return (dispatch) => { 
    dispatch({type: 'REMOVE_NOTIFICATION', payload: notificationId});
  };
}
