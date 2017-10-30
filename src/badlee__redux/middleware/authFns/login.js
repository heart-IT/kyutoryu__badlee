/**
 * @name- login.js
 * 
 * @chill- The wet grass is bright- Here, this moment, is a peace unsurpassed, and I am washed clean.- Ch'iu Wei
 * 
 * 
 * @description- Call server to check whether given credentials were correct or false. Takes action accordingly.
 * 
 * @author- heartit pirates were here
 */

"use strict";

import { AsyncStorage } from "react-native";
import base64 from "base-64";
import * as actionCreators from "../../action_creators";
import { getNextRoute, saveUserInStorage } from "../utility";

export default async function login(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    const { username, password } = action;
    const jollyroger = `Basic ${base64.encode(username + ":" + password)}`;
    let request = await fetch("http://mri2189.badlee.com/login.php", {
      headers: {
        Authorization: jollyroger,
        "Content-Type": "application/json"
      },
      method: "POST"
    });
    if (request.status === 403) {
      let response = await request.json();
      throw response;
    } else if (request.status === 200 && request.ok) {
      let response = await request.json();
      await saveUserInStorage(response, jollyroger);
      action.user = response;
      next(action);
      await store.dispatch(
        actionCreators.navigate(
          getNextRoute(action.route, user.isVerified ? true : false)
        )
      );
    } else {
      throw "Error in requesting";
    }
  } catch (error) {
    await store.dispatch(actionCreators.addError(error));
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
