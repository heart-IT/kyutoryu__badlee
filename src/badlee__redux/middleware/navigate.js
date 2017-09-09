// @flow

/**
 * @name- navigate.js
 * 
 * @chill- Let your heart be pure: This is the doctrine Buddhas teach- Buddha
 * 
 * @description- This is the middleware for navigating page.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import * as actionCreators from "../action_creators";
import type { Action, NAVIGATE_TO } from "../types";

function doNavigate(store, next, action: NAVIGATE_TO) {
  let route = action.route;
  const state = store.getState();
  const navigator = state.getIn(["application", "navigator"]);

  if (navigator && route.component) {
    store.dispatch(actionCreators.clearAllErrors());
    store.dispatch(actionCreators.clearNotification());
    let context = {
      component: route.component,
      params: route.params
    };

    if (route.hasOwnProperty("reset") && route.reset === true) {
      navigator.immediatelyResetRouteStack([context]);
    } else {
      navigator.push(context);
    }
  }
}

export default store => (next: Function) => (action: Action) => {
  if (action.type === "NAVIGATE_TO") {
    return doNavigate(store, next, action);
  }
  return next(action);
};
