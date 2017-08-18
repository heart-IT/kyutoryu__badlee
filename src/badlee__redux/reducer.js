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
    case "LOGIN":
      return core.login(state, action.user);
    case "REGISTER":
      return core.register(state, action.user);
    case "LOGOUT":
      return core.logout(state);
    case "RESTORE_AUTH":
      return core.restoreAuth(state, action.user);
    case "START_LOADING":
      return core.startLoading(state);
    case "FINISH_LOADING":
      return core.finishLoading(state);
    case "INTERNET_CONNECTION":
      return core.changeInternetConnectionStatus(state, action.status);
    case "SET_NAVIGATOR":
      return core.setNavigator(state, action.navigator);
  }

  return state;
}