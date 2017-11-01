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
    let request = await fetch(url, {
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

export async function onClickWish(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    await doRequest(action.badleeID, "wish");
    next(action);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export async function onClickUnwish(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let res = await doRequest(action.badleeID, "unwish");
    next(action);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
