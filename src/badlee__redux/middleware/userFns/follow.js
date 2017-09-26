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
import { AsyncStorage } from 'react-native';

import * as actionCreators from '../../action_creators';

("use strict");

export async function unFollowUser(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
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
    if (unFollowReq.status === 200 && unFollowReq.ok) {
      action.userID = action.id;
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export async function followUser(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
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
    if (followReq.status === 200 && followReq.ok) {
      action.userID = action.id;
      next(action);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
