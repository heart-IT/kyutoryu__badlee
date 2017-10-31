/**
 * @name- save.js
 * 
 * @chill- The little cares that fretted me, I lost them yesterday. Among the fields about the sea, Among the winds at play. -Elizabeth Barrett Browning
 * 
 * 
 * @description- Saving badlee fn here
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

export default async function saveBadlee(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let uploadMedia;
    if (action.uri) {
      uploadMedia = await saveMedia({
        uri: action.uri,
        imageType: action.imageType,
        fileName: action.fileName
      });
      if (uploadMedia.error) {
        throw "Image couldn't be uploaded..";
      }
    }
    const data = {
      media:
        uploadMedia && uploadMedia.url
          ? "http://mri2189.badlee.com/" + uploadMedia.url
          : "",
      description: action.description,
      ip: action.ip,
      location: action.location,
      purpose: action.purpose,
      category: action.category,
      application_id,
      application_secret
    };
    let newBadlee = await badleeSaveRequest(data);
    action.newBadlee = newBadlee;
    next(action);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

async function badleeSaveRequest(data) {
  try {
    const jolly_roger = await AsyncStorage.getItem("jollyroger");
    let formBody = createFormData(data);
    let request = await fetch("http://mri2189.badlee.com/posts.php", {
      method: "POST",
      headers: {
        Authorization: jolly_roger,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (request.status === 200 && request.ok === true) {
      let response = await response.json();
      return response;
    } else {
      throw "Error happened in Saving Request";
    }
  } catch (err) {
    throw err;
  }
}
