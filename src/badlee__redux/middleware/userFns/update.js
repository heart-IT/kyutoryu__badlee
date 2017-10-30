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
    }
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    var data = {
      avatar:
        uploadMedia && uploadMedia.url
          ? "http://mri2189.badlee.com/" + uploadMedia.url
          : "",
      dob: action.dob,
      location: action.location,
      interests: action.interests,
      gender: action.gender,
      application_id,
      application_secret
    };
    action.avatar =
      uploadMedia && uploadMedia.url
        ? "http://mri2189.badlee.com/" + uploadMedia.url
        : "";
    let formBody = createFormData(data);
    let request = await fetch("http://mri2189.badlee.com/userupdate.php", {
      method: "POST",
      headers: {
        Authorization: jollyroger
      },
      body: formBody
    });
    if (request.ok && request.status === 200) {
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
