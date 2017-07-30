// @flow
"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../settings";
import type { Action, REGISTER } from "../types";
import base64 from "base-64";

async function doRegistration(store, next: Function, action: REGISTER) {
  try {
    await store.dispatch(actionCreators.startLoading());
    var data = {
      username: action.username,
      email: action.email,
      password: action.password,
      application_id: action.application_id,
      application_secret: action.application_secret,
      fname: action.fname,
      lname: action.lname,
      gender: action.gender,
      avatar: action.avatar
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    let response = await fetch("http://mri2189.badlee.com/register.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (response.status === 200 && response.ok === true) {
      let user = await response.json();
      let jollyroger = `Basic ${base64.encode(
        data.username + ":" + data.password
      )}`;
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("jollyroger", jollyroger);
      action.user = user;
      await store.dispatch(actionCreators.navigate(action.route));
    }
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => next => (action: Action) => {
  if (action.type === "REGISTER") {
    return doRegistration(store, next, action);
  }
  return next(action);
};
