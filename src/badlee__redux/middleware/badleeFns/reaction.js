/**
 * @name- reaction.js
 * 
 * @chill- There's music in all things, if men had ears. -Lord Byron
 * 
 * 
 * @description- reaction related store function
 * 
 * @author- heartit pirates were here
 */
"use strict";
import * as actionCreators from "../../action_creators";
export default async function showReactionPage(store, next, action) {
  try {
    action.route.params = { id: action.id };
    await store.dispatch(actionCreators.currentShowingBadlee(action.id));
    await store.dispatch(actionCreators.navigate(action.route));
  } catch (err) {
    console.log(err);
  }
}
