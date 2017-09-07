// @flow

/**
 * @name- register.js
 * 
 * @chill- Tension is who you think you should be. Relaxation is who you are.- Chinese Proverb
 * 
 * 
 * @description- Calls server to register user with the given credentials.
 * 
 * @author- hearit pirates were here
 */

"use strict";

import base64 from "base-64";

import type { Action, REGISTER } from "../../types";
import * as actionCreators from "../../action_creators";
import {
  application_id,
  application_secret,
  saveUserInStorage,
  saveMedia,
  createFormData
} from "../utility";

export default async function register(
  store,
  next: Function,
  action: REGISTER
) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let uploadMedia;
    if (action.avatarSource) {
      uploadMedia = await saveMedia({
        uri: userObject.avatarSource,
        imageType: userObject.avatarType,
        fileName: userObject.avatarName
      });
      if (uploadMedia.error) {
        throw "Image couldn't be uploaded..";
      }
    }

    let data = {
      username: action.username,
      fname: action.fname,
      lname: action.lname,
      email: action.email,
      password: action.password,
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
    let formBody = createFormData(data);

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
      await saveUserInStorage(user, jollyroger);

      action.user = user;
      next(action);
      await store.dispatch(actionCreators.navigate(action.route));
    }
  } catch (error) {
    await store.dispatch(actionCreators.addError(error));
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
