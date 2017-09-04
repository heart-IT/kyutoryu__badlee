"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import saveMedia from "./media";

import getBadlees from "./badleeFns/get";

async function saveBadlee(badleeData, badleePhotoUrl) {
  try {
    const data = {
      media: "http://mri2189.badlee.com/" + badleePhotoUrl,
      description: badleeData.description,
      ip: badleeData.ip,
      location: badleeData.location,
      purpose: badleeData.purpose,
      category: badleeData.category,
      application_id: "xYqBgc1Xcf2Ufyhir5ab",
      application_secret: "vh4tyy74xAnNLtGagto4"
    };
    const jolly_roger = await AsyncStorage.getItem("jollyroger");
    let formBody = [];
    for (var props in data) {
      var encodedKey = encodeURIComponent(props);
      var encodedValue = encodeURIComponent(data[props]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join("&");
    let response = await fetch("http://mri2189.badlee.com/posts.php", {
      method: "POST",
      headers: {
        Authorization: jolly_roger,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (response.status === 200 && response.ok === true) {
      var respnseJson = await response.json();
      return respnseJson;
    } else {
      return { error: true };
    }
  } catch (err) {
    return { error: true };
  }
}

async function startSaveProcess(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    var badleeData = action.data;
    var uploadMedia = await saveMedia({
      uri: badleeData.badleePhotoUrl.uri,
      imageType: badleeData.badleePhotoType,
      fileName: badleeData.badleePhotoName
    });
    if (uploadMedia.error) {
      next(action);
    } else {
      var saveBadleeResponse = await saveBadlee(badleeData, uploadMedia.url);
      if (saveBadleeResponse.error) {
        next(action);
      } else {
        await store.dispatch(actionCreators.navigate(action.route));
        next(action);
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => next => action => {
  if (action.type === "SAVE_BADLEE") {
    return startSaveProcess(store, next, action);
  } else if (action.type === "GET_BADLEES") {
    return getBadlees(store, next, action);
  }
  return next(action);
};
