// @flow

/**
 * Even a blade of grass trembling in the evening breeze cannot be known so long as we are unable to merge our particular selves
 * with the self of grass - Soyen Shaku
 * 
 * 
 * Actions describe the fact that something happened, but don't specify how the application's state changes in response.
 * This is the job of reducers.
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
    case "RESTORE_AUTH":
      return core.addUser(state, action.user);
    case "LOGIN":
      return core.addUser(state, action.user);
    case "REGISTER":
      return core.register(state, action.user);
    case "LOGOUT":
      return core.logout(state);
    case "ADD_ERROR":
      return core.addError(state, action.error);
    case "CLEAR_ERROR":
      return core.clearError(state);
    case "ADD_NOTIFICATION":
      return core.addAppNotification(state, action.notification);
    case "CLEAR_NOTIFICATION":
      return core.clearAppNotification(state);
    case "START_LOADING":
      return core.startLoading(state);
    case "FINISH_LOADING":
      return core.finishLoading(state);
    case "INTERNET_CONNECTION":
      return core.changeInternetConnectionStatus(state, action.status);
    case "SET_NAVIGATOR":
      return core.setNavigator(state, action.navigator);
    case "GET__BADLEES":
      return core.getBadlees(
        state,
        action.badlees,
        action.tabName,
        action.badleesInIDS,
        action.page__upper__count
      );
  }

  return state;
}
