/**
 * @name- wish.js
 * 
 * @chill- True wisdom is understanding that you do not understand anything.- Socrates
 *
 * 
 * @description- fns for doing wish and unwish of badlees
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";

/**
 * Fn to call API to wish/unwish a badlee
 * @param {string} badleeID Id of the badlee wish/unwish action was done
 * @param {string} actionType Type of action done [wish, unwish]
 */
async function doRequest(badleeID, actionType) {
  try {
    const jollyroger = await AsyncStorage.getItem("jollyroger");
    const url = `http://mri2189.badlee.com/wish.php?postid=${badleeID}`;
    const requestType = actionType === "wish" ? "POST" : "DELETE";
    const request = await fetch(url, {
      method: requestType,
      headers: {
        Authorization: jollyroger
      }
    });
    if (request.ok && request.status === 200) {
      return response;
    }
  } catch (err) {
    throw err;
  }
}

export async function onClickWish(store, next, action) {
  try {
    next(action);
    if (action.force === undefined || action.force === false) {
      await doRequest(action.badleeID, "wish");
    }
  } catch (err) {
    await store.dispatch(actionCreators.onClickUnwish(action.badleeID), true);
    console.log(err);
  }
}

export async function onClickUnwish(store, next, action) {
  try {
    next(action);
    if (action.force === undefined || action.force === false) {
      await doRequest(action.badleeID, "unwish");
    }
  } catch (err) {
    await store.dispatch(actionCreators.onClickWish(action.badleeID), true);
    console.log(err);
  }
}
