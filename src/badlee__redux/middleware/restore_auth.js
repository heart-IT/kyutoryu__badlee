// @flow
"use strict";

import { AsyncStorage, NetInfo } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../../settings";
import { dummyUser } from "../../fixtures";
import type { Action, RESTORE_AUTH } from "../types";

function getNextRoute(route, isAuthanticated) {
  let components = route.component;
  let component;
  if (isAuthanticated) {
    component = {
      component: components.authenticated.component,
      reset: true
    };
  } else {
    component = {
      component: components.not__authenticated.component,
      reset: true
    };
  }
  return Object.assign(route, component);
}

async function doRestoreAuth(store, next, action: RESTORE_AUTH) {
  try {
    await store.dispatch(actionCreators.startLoading());
    console.log(store.getState());
    NetInfo.isConnected.addEventListener("change", async function(isConnected) {
      await store.dispatch(
        actionCreators.changeInternetConnectionStatus(isConnected)
      );
    });

    let route = action.route;
    let user = await AsyncStorage.getItem("user");
    if (user) {
      action.user = JSON.parse(user);
      next(action);
      route &&
        (await store.dispatch(
          actionCreators.navigate(getNextRoute(route, true))
        ));
    } else {
      route &&
        (await store.dispatch(
          actionCreators.navigate(getNextRoute(route, false))
        ));
    }
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => (next: Function) => (action: Action) => {
  if (action.type === "RESTORE_AUTH") {
    return doRestoreAuth(store, next, action);
  }
  return next(action);
};
