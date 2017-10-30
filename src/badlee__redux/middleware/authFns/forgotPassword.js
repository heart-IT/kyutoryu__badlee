/**
 * @name- forgot_password.js
 * 
 * @chill- Tension is who you think you should be. Relaxation is who you are.- Chinese Proverb.
 * 
 * 
 * @description- Calls Server to send forgot password email
 * 
 * @author- heartit pirates were here
 */

"use strict";
import * as actionCreators from "../../action_creators";
import { application_id, application_secret, createFormData } from "../utility";

export default async function forgot_password(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());

    let { email } = action;
    if (!email) {
      throw "No Email provided";
    }

    var data = {
      email,
      application_id,
      application_secret
    };
    let formBody = createFormData(data);
    let response = await fetch("http://mri2189.badlee.com/forgetpass.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (response.status === 200 && response.ok === true) {
      await store.dispatch(actionCreators.addNotification("Email sent"));
    } else {
      throw "Error in Requesting";
    }
  } catch (error) {
    await store.dispatch(actionCreators.addError(error));
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
