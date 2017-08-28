// @flow
"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../../settings";
import type { Action, REGISTER } from "../types";
import base64 from "base-64";
import saveMedia from "./media";

async function doRegistration(store, next: Function, action: REGISTER) {
  try {
    var userObject = action.userObject;
    await store.dispatch(actionCreators.startLoading());
    var uploadMedia = await saveMedia({
      uri: userObject.avatarSource,
      imageType: userObject.avatarType,
      fileName: userObject.avatarName
    });
    if (uploadMedia.error) {
      next(action);
    }

    var data = {
      username: userObject.uniqueName,
      fname: userObject.firstName,
      lname: userObject.lastName,
      email: userObject.email,
      password: userObject.password,
      avatar: "http://mri2189.badlee.com/" + uploadMedia.url,
      dob: userObject.date,
      location: userObject.location,
      interests: userObject.wish,
      gender: userObject.gender,
      application_id: "xYqBgc1Xcf2Ufyhir5ab",
      application_secret: "vh4tyy74xAnNLtGagto4"
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
      next(action);
    } else {
      next(action);
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
