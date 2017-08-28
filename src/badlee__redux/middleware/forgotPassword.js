"use strict";

import type { Action } from "../types";
import * as actionCreators from "../action_creators";

async function forgotPassword(store, next: Function, action) {
  try {
    let email = action.email;
    await store.dispatch(actionCreators.startLoading());

    var data = {
      email: action.email,
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
      setTimeout(function() {
        store.dispatch(actionCreators.clearNotification());
      }, 15000);
    }
    console.log(response);
  } catch (e) {
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => (next: Function) => (action: Action) => {
  if (action.type === "FORGOT_PASSWORD") {
    return forgotPassword(store, next, action);
  }
  return next(action);
};
