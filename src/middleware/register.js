// @flow
"use strict";

import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
import Settings from "../settings";
import type { Action, REGISTER } from "../types";

async function doRegistration(store, next: Function, action: REGISTER) {
  try {
    await store.dispatch(actionCreators.startLoading());
    const username: string = action.username;
    const email: string = action.email;
    const passwd: string = action.passwd;
    let response = await fetch("http://mri2189.badlee.com/register.php", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: action
    });
    console.log(response);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => next => (action: Action) => {
  if (action.type === "REGISTER") {
    return doRegistration(store, next, action);
  }
  return next(action);
};
