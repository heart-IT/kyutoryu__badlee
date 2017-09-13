// @flow

/**
 * @name- user.js
 * 
 * @chill- Guarding knowledge is not a good way to understand. Understanding means to throw away your knowledge- Thich Nhat Hanh
 * 
 * 
 * @description- User Middleware. Do stuff related to User
 * 
 * @author- heartit pirates were here
 */

"use strict";

import showUserPage from "./userFns/show";
import { followUser, unFollowUser } from "./userFns/follow";

export default store => (next: Function) => (action: Action) => {
  switch (action.type) {
    case "SHOW_USER_PAGE":
      return showUserPage(store, next, action);
      break;
    case "FOLLOW_USER":
      return followUser(store, next, action);
      break;
    case "UNFOLLOW_USER":
      return unFollowUser(store, next, action);
      break;
    default:
      return next(action);
  }
};
