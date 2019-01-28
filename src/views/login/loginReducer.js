
import * as constants from './loginConstants';

const INITAL_STATE = {
  logedIn: false,
  error: {
    type: undefined,
    statusCode: undefined,
    message: undefined,
  },
  success: {
    type: undefined,
    statusCode: undefined,
    message: undefined,
  },
  user: undefined,
};

const prepareNextState = (state, valuedResponse, type, statusCode, message) => {
  let nullValuedResponse = 'error';
  if (valuedResponse.toLowerCase() === 'success') {
    nullValuedResponse = 'error';
  } else {
    nullValuedResponse = 'success';
  }
  return Object.assign({}, state, {
    ...state,
    logedIn: false,
    [valuedResponse]: {
      type,
      statusCode,
      message,
    },
    [nullValuedResponse]: undefined,
    user: undefined,
  });
};

export default (state = INITAL_STATE, action) => {
  if (action.type === constants.AUTHENTICATE) {
    console.log('AUTHENTICATE', action.payload);
  }

  if (action.type === constants.AUTHENTICATEION_SUCCESS) {
    console.log('AUTHENTICATEION_SUCCESS', action.payload);
    const newState = prepareNextState(state, 'success', constants.TYPE_AUTHENTICATION_SUCCESS, action.payload.status, 'Successfully loggedin');
    return Object.assign({}, newState, {
      ...newState,
      logedIn: true,
      user: action.payload.result,
    });
  }

  if (action.type === constants.AUTHENTICATEION_ERROR) {
    console.log('AUTHENTICATEION_ERROR', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_AUTHENTICATION_ERROR, action.payload.status, action.payload.error);
  }

  if (action.type === constants.AUTHENTICATEION_RESPONSE_ERROR) {
    console.log('AUTHENTICATEION_RESPONSE_ERROR', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_AUTHENTICATION_ERROR, 400, 'Required Content Missing, Please try again');
  }

  if (action.type === constants.USERNAME_REQUIRED) {
    console.log('USERNAME_REQUIRED', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_VALIDATION_ERROR, 400, 'Please enter your username');
  }

  if (action.type === constants.PASSWORD_REQUIRED) {
    console.log('PASSWORD_REQUIRED', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_VALIDATION_ERROR, 400, 'Please enter your password');
  }

  if (action.type === constants.USERNAME_PASSWORD_REQUIRED) {
    console.log('USERNAME_PASSWORD_REQUIRED', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_VALIDATION_ERROR, 400, 'Please enter your username & password');
  }

  if (action.type === constants.LOGIN_REQUIRED) {
    console.log('LOGIN_REQUIRED', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_LOGIN_REQUIRED_ERROR, 400, 'You must login before accessing services');
  }
  
  if (action.type === constants.RELOGIN_REQUIRED) {
    console.log('RELOGIN_REQUIRED', action.payload);
    return prepareNextState(state, 'error', constants.TYPE_LOGIN_REQUIRED_ERROR, 400, 'Sorry, something went wrong. Please login again');
  }

  return Object.assign({}, state, {
    ...state,
    error: undefined,
    success: undefined,
  });
};
