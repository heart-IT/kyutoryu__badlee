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
import * as actionCreators from "../../action_creators";

("use strict");

export async function showBadleePage(store, next, action) {
  try {
    action.route.params = { id: action.badleeID };
    let req = await fetch(
      `http://mri2189.badlee.com/posts.php?postid=${action.badleeID}`
    );
    if (req.status === 200 && req.ok) {
      let res = await req.json();
      action.badlee = res;
      console.log("request happenede");
      next(action);
      await store.dispatch(actionCreators.setActiveBadleeID(action.badleeID));
      await store.dispatch(actionCreators.navigate(action.route));
    }
  } catch (err) {
    console.log(err);
  }
}
