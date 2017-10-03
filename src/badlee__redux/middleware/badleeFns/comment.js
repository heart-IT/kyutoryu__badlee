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
import { Component } from 'react';
import { AsyncStorage } from 'react-native';

import * as actionCreators from '../../action_creators';
import { application_id, application_secret, createFormData } from '../utility';


"use strict";

export async function showCommentPage(store, next: Function, action) {
  try {
    action.route.params = { id: action.id };
    await store.dispatch(actionCreators.currentShowingBadlee(action.id));
    await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
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
    console.log(response);
    if (response.status === 200 && response.ok) {
      let requestJson = await response.json();
      return requestJson;
    }
  } catch (err) {
    throw err;
  }
}

export async function postComment(store, next: Function, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    var req = await doComment(action.id, action.comment);
    console.log(req);
    action.commentResponse = req;
    if (req) {
      next(action);
    }
  } catch (err) {
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
