// @flow
"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../settings";
import type { Action, REGISTER } from "../types";

async function doRegistration(store, next: Function, action: REGISTER) {
  try {
    await store.dispatch(actionCreators.startLoading());
    var data = {
      application_id: action.application_id,
      application_secret: action.application_secret,
      email: action.email,
      fname: action.fname,
      lname: action.lname,
      gender: action.gender,
      username: action.username,
      password: action.password
    };
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(data);
    let response = await fetch("http://mri2189.badlee.com/register.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (response.status === 200) {
      await AsyncStorage.setItem("username", data.username);
      await AsyncStorage.setItem("password", data.password);
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
