// @flow

/**
 * @name- reducer.js
 * 
 * @chill- Even a blade of grass trembling in the evening breeze cannot be known so long as we are unable to merge our particular selves
 * with the self of grass - Soyen Shaku
 * 
 * 
 * @description- This function catches the action dispatch and update the application state.
 * 
 * @author - heartit pirates were here.
 */

"use strict";

import * as core from "./core";
import type { State, Action } from "./types";

export function reducer(
  state: State = core.InitialState,
  action: Action
): State {
  switch (action.type) {
    case "INTERNET_CONNECTION":
      return core.changeInternetConnectionStatus(state, action.status);
      break;
    case "SET_NAVIGATOR":
      return core.setNavigator(state, action.navigator);
      break;
    case "START_LOADING":
      return core.startLoading(state);
      break;
    case "FINISH_LOADING":
      return core.finishLoading(state);
      break;
    case "LOGIN":
      return core.addUser(state, action.user);
      break;
    case "REGISTER":
      return core.addUser(state, action.user);
      break;
    case "RESTORE_AUTH":
      return core.addUser(state, action.user);
      break;
    case "LOGOUT":
      return core.clearUser(state);
      break;
    case "ADD_NOTIFICATION":
      return core.addAppNotification(state, action.notification);
      break;
    case "CLEAR_NOTIFICATION":
      return core.clearAppNotification(state);
      break;
    case "ADD_ERROR":
      return core.addError(state, action.error);
      break;
    case "CLEAR_ERROR":
      return core.clearError(state, action.error);
      break;
    case "CLEAR_ALL_ERRORS":
      return core.clearAllError(state);
      break;
    case "GET_BADLEES":
      return core.getBadlees(
        state,
        action.badlees,
        action.tabName,
        action.badleesInIDS
      );
    case "SAVE_BADLEE":
      return core.saveBadlee();
      break;
    case "SHOW_USER_PAGE":
      return core.saveGuestUser(state, action.user);
      break;
    case "FOLLOW_USER":
      return core.followUser(state);
      break;
    case "UNFOLLOW_USER":
      return core.unfollowUser(state);
      break;
    case "ON_CLICK_LIKE":
      return core.onClickLike(state, action.id);
      break;
    case "ON_CLICK_UNLIKE":
      return core.onClickUnlike(state, action.id);
      break;
    case "ON_CLICK_WISH":
      return core.onClickWish(state, action.id);
      break;
    case "ON_CLICK_UNWISH":
      return core.onClickUnwish(state, action.id);
      break;
    default:
      return state;
  }
}
