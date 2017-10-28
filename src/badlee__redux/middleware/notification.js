/**
 * @name- notification
 * 
 * @chill- Be simply true. -Oliver Wendell Holmes
 * 
 * 
 * @description- Middleware handling notification
 * 
 * @author- heartit pirates were here
 */

"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";
async function checkForNotification(store, next, action) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let request = await fetch("http://mri2189.badlee.com/notifications.php", {
      method: "GET",
      headers: {
        Authorization: jollyroger
      }
    });
    console.log(request);
    if (request.status === 200 && request.ok) {
      console.log("hello");
      let notifications = await request.json();
      console.log(notifications);
    }
  } catch (err) {}
}

export default store => next => action => {
  switch (action.type) {
    case "CHECK_NOTIFICATION":
      return checkForNotification(store, next, action);
    default:
      return next(action);
  }
};
