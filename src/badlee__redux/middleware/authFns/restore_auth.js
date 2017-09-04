// @flow

/**
 * @name- restore_auth.js
 * 
 * @chill- Happiness,,, not in another place, but this place- not for another hour, but this hour. - Walt Whitman
 * 
 * 
 * @description- This file checks User was logged in from before. If yes, auto login him.
 * 
 * @author- heartit pirates
 */

"use strict";

import { AsyncStorage, NetInfo } from "react-native";
import * as actionCreators from "../../action_creators";
import type { Action, RESTORE_AUTH } from "../../types";
import { getRestoreAuthNextRoute } from "./../utility";

export default async function restore_auth(
  store,
  next: Function,
  action: RESTORE_AUTH
) {
  try {
    await store.dispatch(actionCreators.startLoading());
    NetInfo.isConnected.addEventListener("change", async function(isConnected) {
      await store.dispatch(
        actionCreators.changeInternetConnectionStatus(isConnected)
      );
    });

    let { route } = action;
    let user = await AsyncStorage.getItem("user");
    if (user) {
      action.user = JSON.parse(user);
      next(action);
    }
    route &&
      (await store.dispatch(
        actionCreators.navigate(
          getRestoreAuthNextRoute(route, user ? true : false)
        )
      ));
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
