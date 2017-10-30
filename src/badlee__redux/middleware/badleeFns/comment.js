/**
 * @name- comment.js
 * 
 * @chill- To live is the rarest thing in the world. Most people exist, that is all
 * 
 * 
 * @description- This file handles fns related to commenting
 * 
 * @author- heartit pirates were here
 */
import { Component } from "react";
import { AsyncStorage } from "react-native";

import * as actionCreators from "../../action_creators";
import { application_id, application_secret, createFormData } from "../utility";

("use strict");

export async function showCommentPage(store, next, action) {
  try {
    action.route.params = { id: action.badleeID };
    await store.dispatch(actionCreators.setActiveBadleeID(action.badleeID));
    await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
  }
}

async function deleteRequest(id) {
  try {
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let response = await fetch(
      `http://mri2189.badlee.com/comment.php?commentid=${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: jollyroger
        }
      }
    );
    if (response.status === 200 && response.ok) {
      var responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    }
  } catch (err) {
    throw err;
  }
}

async function doComment(postid, content) {
  try {
    let data = {
      postid,
      content,
      application_id,
      application_secret
    };
    let formBody = createFormData(data);
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let response = await fetch("http://mri2189.badlee.com/comment.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: jollyroger
      },
      body: formBody
    });
    if (response.status === 200 && response.ok) {
      let requestJson = await response.json();
      return requestJson;
    }
  } catch (err) {
    throw err;
  }
}

export async function postComment(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    var req = await doComment(action.badleeID, action.comment);
    console.log(req);
    action.comment_id = req.comment_id;
    action.content = req.content;
    action.timestamp = req.timestamp;
    next(action);
  } catch (err) {
    console.log("error in posting");
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export async function deleteComment(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    var req = await deleteRequest(action.commentID);
    next(action);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
