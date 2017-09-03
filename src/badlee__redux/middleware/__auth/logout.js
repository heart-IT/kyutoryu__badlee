// @flow

/**
 * @name- logout.js
 * 
 * @chill- Make the cosmos your governing principle- Buddha
 * 
 * 
 * @description- Clear User Information and update App state to logout user.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";
import type { Action, LOGOUT } from "../../types";

export default async function removeStore(
  store,
  next: Function,
  action: LOGOUT
) {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("jollyroger");

  let route = action.route;

  route && (await store.dispatch(actionCreators.navigate(route)));
  next(action);
}
