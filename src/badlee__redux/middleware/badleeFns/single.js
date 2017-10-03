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
import * as actionCreators from '../../action_creators';

("use strict");

export async function showBadleePage(store, next, action) {
  try {
    action.route.params = { id: action.id };
    await store.dispatch(actionCreators.currentShowingBadlee(action.id));
    await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
  }
}
