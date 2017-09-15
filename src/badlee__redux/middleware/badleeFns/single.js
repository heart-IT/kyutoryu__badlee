/**
 * @name- single.js
 * 
 * @chill- This very body is the Buddha- Hakuin
 * 
 * 
 * @description- Middleware fns related to single badlee page
 * 
 * @author- heartit pirates
 */

"use strict";

import * as actionCreators from "../../action_creators";

export async function showBadleePage(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    await store.dispatch(actionCreators.saveTempBadlee(action.id));
    action.route.params = { id: action.id };
    await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
