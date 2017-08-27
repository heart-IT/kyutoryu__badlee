// @flow

/**
 * @chill- The wet grass is bright- Here, this moment, is a peace unsurpassed, and I am washed clean.- Ch'iu Wei
 * @name- login
 * @description- This is the middleware that handles login related queries.
 * @author- heartit pirates were here
 */
"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import type { Action, LOGIN } from "../types";
import base64 from "base-64";

function getNextRoute(route, isVerified) {
  let components = route.component;
  let component;
  if (isVerified) {
    component = {
      component: components.verified,
      reset: true
    };
  } else {
    component = {
      component: components.not_verified,
      reset: true
    };
  }
  return Object.assign(route, component);
}

async function checkLogin(store, next: Function, action: LOGIN) {
  try {
    await store.dispatch(actionCreators.startLoading());
    const username: string = action.username;
    const password: string = action.password;
    let response = await fetch("http://mri2189.badlee.com/login.php", {
      headers: {
        Authorization: `Basic ${base64.encode(username + ":" + password)}`,
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    if (response.status === 200 && response.ok === true) {
      let user = await response.json();
      let jollyroger = `Basic ${base64.encode(username + ":" + password)}`;

      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("jollyroger", jollyroger);

      action.user = user;
      next(action);

      await store.dispatch(
        actionCreators.navigate(
          getNextRoute(action.route, user.isVerified ? true : false)
        )
      );
    } else {
      var error = await response.json();
      await store.dispatch(actionCreators.addError(error));
    }
  } catch (e) {
    console.log(e);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => next => (action: Action) => {
  if (action.type === "LOGIN") {
    return checkLogin(store, next, action);
  }
  return next(action);
};
