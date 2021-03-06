// @flow
import forgot_password from './authFns/forgot_password';
import login from './authFns/login';
import logout from './authFns/logout';
import register from './authFns/register';
import restoreAuth from './authFns/restoreAuth';
import { checkEmailUniqueness, checkUsernameUniqueness } from './authFns/uniqueFns';

/**
 * @name- auth.js
 * 
 * @chill- Do not seek to follow in the footsteps of the wise one: seek what they sought. - Matsuo Basho
 * 
 * 
 * @description- Middleware to handle user auth related actions.
 * 
 * @author- heartit pirates were here
 */

("use strict");

export default store => next => action => {
  switch (action.type) {
    case "RESTORE_AUTH":
      return restoreAuth(store, next, action);
      break;
    case "LOGIN":
      return login(store, next, action);
      break;
    case "REGISTER":
      return register(store, next, action);
      break;
    case "CHECK_EMAIL_UNIQUENESS":
      return checkEmailUniqueness(store, next, action);
      break;
    case "CHECK_USERNAME_UNIQUENESS":
      return checkUsernameUniqueness(store, next, action);
      break;
    case "LOGOUT":
      return logout(store, next, action);
      break;
    case "FORGOT_PASSWORD":
      return forgot_password(store, next, action);
      break;
    default:
      return next(action);
  }
};
