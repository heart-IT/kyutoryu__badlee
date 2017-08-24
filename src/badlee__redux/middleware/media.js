// @flow

/**
 * In the absence of regret, bliss arises. This is the way of things. - Buddha
 */
"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";

async function saveMedia(store, next: Function, action) {
  await store.dispatch(actionCreators.startLoading());
  var data = {
    uri: action.uri
  };
  var file = {
    uri: action.uri,
    type: action.imageType,
    name: action.fileName
  };
  const jolly_roger = await AsyncStorage.getItem("jollyroger");

  var body = new FormData();
  body.append("media", file);
  body.append("application_id", "xYqBgc1Xcf2Ufyhir5ab");
  body.append("application_secret", "vh4tyy74xAnNLtGagto4");
  const response = await fetch("http://mri2189.badlee.com/media.php", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: jolly_roger
    },
    body: body
  });
  const responseData = await response.text();
  console.log(response);
  next(action);
}

export default store => (next: Function) => action => {
  if (action.type === "SAVEMEDIA") {
    return saveMedia(store, next, action);
  }
  return next(action);
};
