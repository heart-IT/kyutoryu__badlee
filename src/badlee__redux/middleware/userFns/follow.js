/**
 * @name- follow.js
 * 
 * @chill-
 * 
 * 
 * @description- Follow and unfollow fns for user
 * 
 * @author- heartit pirates
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";

export async function unFollowUser(store, next, action) {
  try {
    next(action);
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    var unFollowReq = await fetch(
      `http://mri2189.badlee.com/follow.php?userid=${action.userID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (!unFollowReq.status === 200 || !unFollowReq.ok) {
      store.dispatch(actionCreators.followUser(action.id));
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
}

export async function followUser(store, next, action) {
  try {
    next(action);
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    var followReq = await fetch(
      `http://mri2189.badlee.com/follow.php?userid=${action.userID}`,
      {
        method: "POST",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (!followReq.status === 200 || !followReq.ok) {
      store.dispatch(actionCreators.unFollowUser(action.id));
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
}
