/**
 * @name- reportBadlee.js
 * 
 * @chill- A great elephant does not walk on a rabbit's path. Enlightenment goes far beyond our intellect. Do not use a tiny blade of grass to measure the heavens. -Yoka Daishi
 * 
 * 
 * @description- Report Badlee Function
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";
import { application_id, application_secret, createFormData } from "../utility";
export default async function reportBadlee(store, next, action) {
  try {
    const data = {
      itemid: action.badleeID,
      itemtype: "badlee",
      message: action.reason,
      application_id,
      application_secret
    };
    const jolly_roger = await AsyncStorage.getItem("jollyroger");
    let formBody = createFormData(data);
    let request = await fetch("http://mri2189.badlee.com/report.php", {
      method: "POST",
      headers: {
        Authorization: jolly_roger,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    if (request.status === 200 && request.ok) {
      var response = await request.json();
      action.reportItem = response;
      next(action);
    } else {
      throw "Error happened in reporting";
    }
  } catch (err) {
    console.log(err);
  }
}
