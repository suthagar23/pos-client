import * as constants from './notificationConstants';

const INITAL_STATE =  [
  {
    notificationId: undefined,
    notificationType: 'danger',
    notificationMessage: 'sample message',
    notificationCloseButton: 'true',
    notificationDisplayed: false,
  }
];

export default (state = INITAL_STATE, action) => {

  if (action.type === constants.ADD_NOTIFICATION) {
    return [...state, action.payload];
  }

  if (action.type === constants.REMOVE_NOTIFICATION) {
    const filteredItems = state.filter(state => state.notificationId !== action.payload);
    return [...filteredItems];
  }

  if (action.type === constants.RESET_NOTIFICATION) {
    return INITAL_STATE;
  }

  return state.filter(state => state.notificationId !== undefined);
};