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
      method: "POST",
      headers: {
        Authorization: jollyroger
      }
    });
    if (request.status === 200 && request.ok) {
      let notifications = await request.json();
      let notificationByID = {};
      let order = notifications.map(notification => {
        notificationByID[notification.notification_id] = notification;
        return notification.notification_id;
      });
      action.notificationByID = notificationByID;
      action.order = order;
      next(action);
    }
  } catch (err) {
    console.log(err);
  }
}

export default store => next => action => {
  switch (action.type) {
    case "CHECK_NOTIFICATION":
      return checkForNotification(store, next, action);
    default:
      return next(action);
  }
};
