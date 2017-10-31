/**
 * @name- update.js
 * 
 * @chill- With two ears but only one mouth, we are made to listen more than to speak. -Zeno of Citium
 * 
 * 
 * @description- Update User Fn
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";
import {
  application_id,
  application_secret,
  createFormData,
  saveMedia
} from "../utility";
export default async function updateUser(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let uploadMedia;
    if (action.avatarSource) {
      uploadMedia = await saveMedia({
        uri: action.avatarSource,
        imageType: action.avatarType,
        fileName: action.avatarName
      });
      if (uploadMedia.error) {
        throw "Image couldn't be uploaded..";
      }
      action.avatar =
        uploadMedia &&
        uploadMedia.url &&
        "http://mri2189.badlee.com/" + uploadMedia.url;
    }
    let jollyroger = await AsyncStorage.getItem("jollyroger");

    var data = {
      avatar: action.avatar,
      dob: action.dob,
      location: action.location,
      interests: action.interests,
      gender: action.gender,
      application_id,
      application_secret
    };
    let formBody = createFormData(data);
    let request = await fetch("http://mri2189.badlee.com/userupdate.php", {
      method: "POST",
      headers: {
        Authorization: jollyroger,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (request.ok && request.status === 200) {
      let response = await request.json();
      let storedUserData = await AsyncStorage.getItem("user");
      let userData = JSON.parse(storedUserData);
      let newUserData = Object.assign({}, userData, {
        dob: response.dob,
        avatar: response.avatar,
        gender: response.gender,
        location: response.location,
        interests: response.interests
      });
      await AsyncStorage.setItem("user", JSON.stringify(newUserData));
      await store.dispatch(actionCreators.addNotification("Profile Updated"));
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
