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
import { AsyncStorage } from "react-native";

import * as actionCreators from "../../action_creators";

("use strict");

export async function unFollowUser(store, next, action) {
  try {
    action.userID = action.id;
    next(action);
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    var unFollowReq = await fetch(
      `http://mri2189.badlee.com/follow.php?userid=${action.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    console.log(unFollowReq);
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
    action.userID = action.id;
    next(action);
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    var followReq = await fetch(
      `http://mri2189.badlee.com/follow.php?userid=${action.id}`,
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
