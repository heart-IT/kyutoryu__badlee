/**
 * @chill- Tension is who you think you should be. Relaxation is who you are.- Chinese Proverb.
 */

"use strict";

import type { Action } from "../../types";
import * as actionCreators from "../../action_creators";

export default async function forgot_password(store, next: Function, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let { email } = action;
    if (!email) throw "No Email provided";
    var data = {
      email,
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
  } catch (e) {
    await store.dispatch(actionCreators.addError(e));
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
