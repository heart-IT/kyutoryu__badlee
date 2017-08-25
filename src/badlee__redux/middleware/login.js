// @flow
"use strict";

import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../../settings";
import { dummyUser, dummyToken, dummyLogin } from "../../fixtures";
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
    const password: string = action.password;
    const username: string = action.username;
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
      if (user.verified) {
        await store.dispatch(
          actionCreators.navigate(getNextRoute(action.route, true))
        );
      } else {
        await store.dispatch(
          actionCreators.navigate(getNextRoute(action.route, false))
        );
      }
    } else {
      Toast.show({
        type: "danger",
        position: "bottom",
        buttonText: "OK",
        duration: 4000,
        text: "Invalid username or password"
      });
    }
    next(action);
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
