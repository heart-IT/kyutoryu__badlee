// @flow

/**
 * @name- login.js
 * 
 * @chill- The wet grass is bright- Here, this moment, is a peace unsurpassed, and I am washed clean.- Ch'iu Wei
 * 
 * 
 * @description- Call server to check whether given credentials were correct or false. Takes action accordingly.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import { AsyncStorage } from "react-native";
import base64 from "base-64";

import type { Action, LOGIN } from "../../types";

import * as actionCreators from "../../action_creators";
import { getNextRoute, saveUserInStorage } from "../utility";

export default async function login(store, next: Function, action: LOGIN) {
  try {
    await store.dispatch(actionCreators.startLoading());

    let { username, password } = action;

    var authorizedCode = `Basic ${base64.encode(username + ":" + password)}`;

    let response = await fetch("http://mri2189.badlee.com/login.php", {
      headers: {
        Authorization: authorizedCode,
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    var responseJson = await response.json();
    if (response.status === 403) {
      throw responseJson;
    } else if (response.status === 200 && response.ok === true) {
      let user = responseJson;
      let jollyroger = authorizedCode;
      await saveUserInStorage(user, jollyroger);

      action.user = user;
      next(action);

      await store.dispatch(
        actionCreators.navigate(
          getNextRoute(action.route, user.isVerified ? true : false)
        )
      );
    } else {
      throw "Error in requesting";
    }
  } catch (error) {
    await store.dispatch(actionCreators.addError(error));
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
