// @flow

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

"use strict";

import type { Action } from "../types";
import login from "./authFns/login";
import register from "./authFns/register";
import restore_auth from "./authFns/restore_auth";
import logout from "./authFns/logout";
import forgot_password from "./authFns/forgot_password";

export default store => next => action => {
  if (action.type === "LOGIN") {
    return login(store, next, action);
  } else if (action.type === "REGISTER") {
    return register(store, next, action);
  } else if (action.type === "RESTORE_AUTH") {
    return restore_auth(store, next, action);
  } else if (action.type === "LOGOUT") {
    return logout(store, next, action);
  } else if (action.type === "FORGOT_PASSWORD") {
    return forgot_password(store, next, action);
  }
  return next(action);
};
