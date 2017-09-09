// @flow

/**
 * @name- user.js
 * 
 * @chill- Guarding knowledge is not a good way to understand. Understanding means to throw away your knowledge- Thich Nhat Hanh
 * 
 * 
 * @description- User Middleware. Do stuff related to User
 * 
 * @author- heartit pirates were here
 */

"use strict";

import { AsyncStorage } from "react-native";
import type { Action, SHOW_USER_PAGE } from "../types";
import * as actionCreators from "../action_creators";

async function unFollowUser(store, next: Function, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    var x = await fetch(
      `http://mri2189.badlee.com/follow.php?userid=${action.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    console.log(x);
    var y = await x.json();
    console.log(y);
    await store.dispatch(actionCreators.addNotification("User Unfollowed"));
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
async function followUser(store, next: Function, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    await fetch(`http://mri2189.badlee.com/follow.php?userid=${action.id}`, {
      method: "POST",
      headers: {
        Authorization: jollyroger
      }
    });
    await store.dispatch(actionCreators.addNotification("User Followed"));
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

async function getUser(id) {
  let userGetRequest = await fetch(
    `http://mri2189.badlee.com/user.php?userid=${id}`
  );
  let user = await userGetRequest.json();
  return user;
}

async function showUserPage(store, next: Function, action: SHOW_USER_PAGE) {
  try {
    await store.dispatch(actionCreators.startLoading());

    let user = await getUser(action.id);
    action.route.params = { user: user, isOtherProfile: true };
    await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => (next: Function) => (action: Action) => {
  switch (action.type) {
    case "SHOW_USER_PAGE":
      return showUserPage(store, next, action);
      break;
    case "FOLLOW_USER":
      return followUser(store, next, action);
      break;
    case "UNFOLLOW_USER":
      return unFollowUser(store, next, action);
      break;
    default:
      return next(action);
  }
};
