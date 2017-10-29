// @flow
import { followUser, unFollowUser } from "./userFns/follow";
import getBadlees from "./userFns/getBadlees";
import showUserPage from "./userFns/show";
import searchUser from "./userFns/search";

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

("use strict");

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
    case "GET_USER_BADLEES":
      return getBadlees(store, next, action);
      break;
    case "SEARCH_USER":
      return searchUser(store, next, action);
      break;
    default:
      return next(action);
  }
};
