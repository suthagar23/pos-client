
import * as constants from './loginConstants';
import fetchPost from '../../utils/restMethods';

export function validateUserLoginForm(payload) {
  const { userName, password } = payload;
  if (!userName && !password) {
    return { type: constants.USERNAME_PASSWORD_REQUIRED, payload };
  }
  if (!userName) {
    return { type: constants.USERNAME_REQUIRED, payload };
  }
  if (!password) {
    return { type: constants.PASSWORD_REQUIRED, payload };
  }
  return { type: constants.AUTHENTICATE, payload };
}

