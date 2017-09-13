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

async function doUnwish(postid) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let unwishRequest = await fetch(
      `http:///mri2189.badlee.com/wish.php?postid=${postid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (unwishRequest.status === 200 && unwishRequest.ok) {
      let requestJson = await unwishRequest.json();
      return requestJson;
    }
  } catch (err) {
    throw err;
  }
}

async function doWish(postid) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let wishRequest = await fetch(
      `http:///mri2189.badlee.com/wish.php?postid=${postid}`,
      {
        method: "POST",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (wishRequest.status === 200 && wishRequest.ok) {
      let requestJson = await wishRequest.json();
      return requestJson;
    }
  } catch (err) {
    throw err;
  }
}

export async function onClickWish(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let badleeID = action.id;
    let wishReqResponse = await doWish(badleeID);
    console.log(wishReqResponse);
    if (wishReqResponse) {
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export async function onClickUnwish(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let badleeID = action.id;
    let wishReqResponse = await doUnwish(badleeID);
    if (wishReqResponse) {
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
