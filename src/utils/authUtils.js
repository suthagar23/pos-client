import { COOKIE_AUTH } from './constants';
import fetchPost from './restMethods';
import * as constants from '../views/login/loginConstants';

export const CreateAuthCookie = (cookies, object) => {
  cookies.set(COOKIE_AUTH, object, { path: '/', maxAge: 1500 });
  return cookies.get(COOKIE_AUTH);
};

export const DeleteAuthCookie = (cookies) => {
  cookies.remove(COOKIE_AUTH);
};

export const GetAuthCookie = (cookies) => {
  return cookies.get(COOKIE_AUTH);
};


export function authenticateUser(payload, cookies) {
  return (dispatch) => {
    return fetchPost('/auth', payload)
      .then((res) => {
        const resStatusCode = (res || {}).status;
        if (resStatusCode === 200) {
          const { result: userInfo } = res;
          if (userInfo) {
            CreateAuthCookie(cookies, { isLogedIn : true, userInfo: userInfo });
            dispatch({ type: constants.AUTHENTICATEION_SUCCESS, payload: res });
          }
          else {
            // if auth object doesn't contain user object
            DeleteAuthCookie(cookies);
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