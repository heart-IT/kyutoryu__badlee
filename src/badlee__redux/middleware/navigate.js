// @flow
import * as actionCreators from '../action_creators';


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

import type { Action, NAVIGATE_TO } from "../types";

function doBack(store, next, action) {
  const state = store.getState();
  const scopeNavigator = state.getIn(["application", "navigator"]);
  store.dispatch(actionCreators.clearAllErrors());
  store.dispatch(actionCreators.clearNotification());
  if (scopeNavigator && scopeNavigator.getCurrentRoutes().length > 1) {
    // unmount current screen and go to previous scene
    scopeNavigator.pop();
  }
}

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
  } else if (action.type === "GO_BACK") {
    return doBack(store, next, action);
  }
  return next(action);
};
