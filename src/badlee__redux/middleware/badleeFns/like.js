/**
 * @name- like.js
 * 
 * @chill- Try eating without doing anything else: no talking, reading, walking, driving, working. Just eat. Really slowly. 
 * It can be alternately transcendent or totally annoying. Keep doing it anyway. -Katie Goodman
 *
 * 
 * @description- fns for doing like and unliking of badlees
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";

/**
 * Fn to call API to like/unlike a badlee
 * @param {string} badleeID Id of the badlee like/unlike action was done
 * @param {string} actionType Type of action done [like, unlike]
 */
async function doRequest(badleeID, actionType) {
  try {
    const jollyroger = await AsyncStorage.getItem("jollyroger");
    const url = `http://mri2189.badlee.com/like.php?postid=${badleeID}`;
    const requestType = actionType === "like" ? "POST" : "DELETE";
    const request = await fetch(url, {
      method: requestType,
      headers: {
        Authorization: jollyroger
      }
    });
    if (request.ok && request.status === 200) {
      return true;
    } else {
      throw "error in request";
    }
  } catch (err) {
    throw err;
  }
}

export async function onClickLike(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    await doRequest(action.badleeID, "like");
    next(action);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export async function onClickUnlike(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    await doRequest(action.badleeID, "unlike");
    next(action);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
