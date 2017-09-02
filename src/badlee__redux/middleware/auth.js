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
import login from "./__auth/login";
import register from "./__auth/register";
import restore_auth from "./__auth/restore_auth";
import logout from "./__auth/logout";
import forgot_password from "./__auth/forgot_password";

export default store => next => action => {
  if (action.type === "LOGIN") {
    return login(store, next, action);
  } else if (action.type === "REGISTER") {
    return register(store, next, action);
  } else if (action.type === "RESTORE__AUTH") {
    return restore_auth(store, next, action);
  } else if (action.type === "LOGOUT") {
    return logout(store, next, action);
  } else if (action.type === "FORGOT__PASSWORD") {
    return forgot_password(store, next, action);
  }
  return next(action);
};
