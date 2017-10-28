/**
 * 
 * @name- save.js
 * 
 * @chill- The little cares that fretted me, I lost them yesterday. Among the fields about the sea, Among the winds at play. -Elizabeth Barrett Browning
 * 
 * 
 * @description- Saving badlee fn here
 * 
 * @author- heartit pirates were here
 */
import { AsyncStorage } from "react-native";

import * as actionCreators from "../../action_creators";
import {
  application_id,
  application_secret,
  createFormData,
  saveMedia
} from "../utility";

("use strict");

export default async function saveBadlee(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let badleeData = action.data;
    let { uri, imageType, fileName } = badleeData;
    let uploadMedia = await saveMedia({
      uri: uri,
      imageType: imageType,
      fileName: fileName
    });
    badleeData.uri = uploadMedia.url;
    let newBadlee = await badleeSaveRequest(badleeData);
    action.newBadlee = newBadlee;
    next(action);
    // await store.dispatch(actionCreators.currentShowingBadlee(newBadlee.id));
    // await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

async function badleeSaveRequest(badleeData) {
  try {
    const data = {
      media: "http://mri2189.badlee.com/" + badleeData.uri,
      description: badleeData.description,
      ip: badleeData.ip,
      location: badleeData.location,
      purpose: badleeData.purpose,
      category: badleeData.category,
      application_id,
      application_secret
    };
    const jolly_roger = await AsyncStorage.getItem("jollyroger");
    let formBody = createFormData(data);
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
      throw "Error happened in Saving Request";
    }
  } catch (err) {
    console.log(err);
  }
}
