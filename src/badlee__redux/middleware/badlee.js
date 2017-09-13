/**
 * name- badlee.js
 * 
 * @chill- Not knowing why, not knowing why- This is my foundation: Not knowing why- Saichi
 * 
 * 
 * @description- This is the main middleware responsible for handling req related to badlees like get or save requests.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import getBadlees from "./badleeFns/get";
import * as saveBadlee from "./badleeFns/save";
import { onClickLike, onClickUnlike } from "./badleeFns/like";
import { onClickWish, onClickUnwish } from "./badleeFns/wish";

export default store => next => action => {
  switch (action.type) {
    case "GET_BADLEES":
      return getBadlees(store, next, action);
      break;
    case "SAVE_BADLEE":
      return saveBadlee(store, next, action);
      break;
    case "ON_CLICK_LIKE":
      return onClickLike(store, next, action);
      break;
    case "ON_CLICK_UNLIKE":
      return onClickUnlike(store, next, action);
      break;
    case "ON_CLICK_WISH":
      return onClickWish(store, next, action);
      break;
    case "ON_CLICK_UNWISH":
      return onClickUnwish(store, next, action);
      break;
    default:
      return next(action);
  }
};
