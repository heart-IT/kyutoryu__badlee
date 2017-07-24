// @flow
"use strict";

import { Toast } from "native-base";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../settings";
import { dummyUser, dummyToken, dummyLogin } from "../fixtures";
import type { Action, LOGIN } from "../types";
import base64 from "base-64";

async function checkLogin(store, next: Function, action: LOGIN) {
  try {
    await store.dispatch(actionCreators.startLoading());

    const password: string = action.password;
    const username: string = action.username;
    let response = await fetch("http://mri2189.badlee.com/login.php", {
      headers: {
        Authorization: `Basic ${base64.encode(username + ":" + password)}`
      },
      method: "POST"
    });
    if (response.status === 200) {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);
      action.token = dummyToken;
      action.user = dummyUser;
      await store.dispatch(actionCreators.navigate(action.route));
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
