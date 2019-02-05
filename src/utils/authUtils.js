import { COOKIE_AUTH } from './constants';
import { fetchPost } from './restMethods';
import * as constants from '../views/login/loginConstants';
import {LOGIN_REQUIRED, RELOGIN_REQUIRED} from '../views/login/loginConstants';
import {PATH_SALES, PATH_AUTH} from '../routes/routesConstants';
import Cookies from 'js-cookie';

export const CreateAuthCookie = (object) => {
  Cookies.set(COOKIE_AUTH, object, { path: '/', expires: 10 });
  return Cookies.getJSON(COOKIE_AUTH);
};

export const DeleteAuthCookie = () => {
  Cookies.remove(COOKIE_AUTH);
};

export const GetAuthCookie = () => {
  return Cookies.getJSON(COOKIE_AUTH);
};


export function authenticateUser(payload) {
  return (dispatch) => {
    return fetchPost('/auth', payload)
      .then((res) => {
        const resStatusCode = (res || {}).status;
        if (resStatusCode === 200) {
          const { result: userInfo, token } = res;
          if (userInfo) {
            CreateAuthCookie({ isLogedIn : true, userInfo: userInfo, authToken: token });
            dispatch({ type: constants.AUTHENTICATEION_SUCCESS, payload: res });
          }
          else {
            // if auth object doesn't contain user object
            DeleteAuthCookie();
            dispatch({ type: constants.AUTHENTICATEION_RESPONSE_ERROR, payload: res });
          }
        } else {
          dispatch({ type: constants.AUTHENTICATEION_ERROR, payload: res });
        }
      })
      .catch((err) => {
        dispatch({ type: constants.AUTHENTICATEION_ERROR, payload: err });
      });
  };
}

export function checkForLoginStatus(props) {
  const { dispatch } = props;
  const {isLogedIn, userInfo} = GetAuthCookie() || {};
  if (typeof isLogedIn === 'undefined') {
    dispatch({type: LOGIN_REQUIRED});
    props.history.push(PATH_AUTH);
    return false;
  }
  else if (typeof userInfo === 'undefined') {
    dispatch({type: RELOGIN_REQUIRED});
    props.history.push(PATH_AUTH);
    return false;
  }
  else {
    return true;
  }
}

export function getAuthToken() {
  const { authToken } = GetAuthCookie() || {};
  if (typeof authToken !== undefined ) {
    return authToken;
  }
  return '';
}