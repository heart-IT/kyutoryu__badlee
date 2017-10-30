/**
 * @name- navigate.js
 * 
 * @chill- Let your heart be pure: This is the doctrine Buddhas teach- Buddha
 * 
 * 
 * @description- This is the middleware for navigating page.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import * as actionCreators from "../action_creators";

export default store => next => action => {
  switch (action.type) {
    case "GO_BACK":
      return goBack(store, next, action);
    case "NAVIGATE_TO":
      return navigateTo(store, next, action);
      break;
    default:
      return next(action);
  }
};

// Fn to goBack
function goBack(store, next, action) {
  const state = store.getState();
  const scopeNavigator = state.getIn(["application", "navigator"]);
  store.dispatch(actionCreators.clearAllErrors());
  store.dispatch(actionCreators.clearAllNotification());
  if (scopeNavigator && scopeNavigator.getCurrentRoutes().length > 1) {
    scopeNavigator.pop();
  }
}
// Fn to route passed in action
function navigateTo(store, next, action) {
  let route = action.route;
  const state = store.getState();
  const navigator = state.getIn(["application", "navigator"]);

  if (navigator && route.component) {
    store.dispatch(actionCreators.clearAllErrors());
    store.dispatch(actionCreators.clearAllNotification());
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
