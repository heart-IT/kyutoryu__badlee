/**
 * @name- like.js
 * 
 * @chill- Try eating without doing anything else: no talking, reading, walking, driving, working. Just eat. Really slowly. 
  It can be alternately transcendent or totally annoying. Keep doing it anyway. -Katie Goodman
 *
 * 
 * @description- fns for doing like and unliking of badlees
 * 
 * @author- heartit pirates were here
 */

"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";

async function doUnlike(postid) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let unlikeRequest = await fetch(
      `http:///mri2189.badlee.com/like.php?postid=${postid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (unlikeRequest.status === 200 && unlikeRequest.ok) {
      let requestJson = await unlikeRequest.json();
      return requestJson;
    }
  } catch (err) {
    throw err;
  }
}

async function doLike(postid) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let likeRequest = await fetch(
      `http:///mri2189.badlee.com/like.php?postid=${postid}`,
      {
        method: "POST",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (likeRequest.status === 200 && likeRequest.ok) {
      let requestJson = await likeRequest.json();
      return requestJson;
    }
  } catch (err) {
    throw err;
  }
}

export async function onClickLike(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let badleeID = action.id;
    let likeReqResponse = await doLike(badleeID);
    if (likeReqResponse === "Liked") {
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export async function onClickUnlike(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let badleeID = action.id;
    let likeReqResponse = await doUnlike(badleeID);
    if (likeReqResponse) {
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
