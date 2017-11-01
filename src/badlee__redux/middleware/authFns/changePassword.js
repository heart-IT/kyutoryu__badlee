/**
 * @name- changePassword.js
 * 
 * @chill- Where there is patience and humility there is neither anger nor worry. -Francis of Assisi
 * 
 * 
 * @description- change password fn
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";
import { createFormData, application_secret, application_id } from "../utility";
import base64 from "base-64";
export default async function changePassword(store, next, action) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    const state = store.getState();
    const username = state.getIn([
      "user",
      "data",
      state.getIn(["user", "loggedUserID"]),
      "username"
    ]);
    let data = {
      application_id,
      application_secret,
      password: action.new
    };
    let formData = createFormData(data);
    let req = await fetch("http://mri2189.badlee.com/passupdate.php", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64.encode(username + ":" + action.old)}`,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      data: formData
    });
    console.log(req);
    if (req.ok && req.status) {
      let res = await req.text();
      console.log(res);
      // const newJollyroger = `Basic ${base64.encode(
      //   username + ":" + action.new
      // )}`;
      // AsyncStorage.setItem("jollyroger", newJollyroger);
      // store.dispatch(actionCreators.addNotification("Password Updated"));
    } else if (req.status === 403) {
      throw "Wrong Password given";
    }
  } catch (err) {
    console.log(err);
    store.dispatch(actionCreators.addError(err));
  }
}
