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

    if (unFollowReq.status === 200 && unFollowReq.ok) {
      let user = await AsyncStorage.getItem("user");
      let userData = JSON.parse(user);
      let userFollowing = userData.following;
      let removeUnFollowedUser = userFollowing.filter(
        following => following.user_id_following !== action.userID
      );
      let newUserData = Object.assign({}, userData, {
        following: removeUnFollowedUser
      });
      await AsyncStorage.setItem("user", JSON.stringify(newUserData));
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
  }
}

export async function followUser(store, next, action) {
  try {
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
    if (followReq.status === 200 && followReq.ok) {
      let response = await followReq.json();
      let user = await AsyncStorage.getItem("user");
      let followObject = {
        user_id_following: action.userID,
        username: response.username,
        name: response.fname + " " + response.lname,
        avatar: response.avatar
      };
      let userData = JSON.parse(user);
      let userFollowing = userData.following;
      let newFollowing = [];
      userFollowing && userFollowing.push(followObject);
      let newUserData = Object.assign({}, userData, {
        following: userFollowing
      });
      await AsyncStorage.setItem("user", JSON.stringify(newUserData));
      action.followObject = followObject;
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    store.dispatch(actionCreators.finishLoading());
  }
}
