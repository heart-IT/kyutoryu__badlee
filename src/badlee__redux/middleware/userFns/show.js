/**
 * @name- show.js
 * 
 * @chill-
 * 
 * 
 * @description- Show Other user Page
 * 
 * @author- heartit pirates were here
 */

"use strict";

import type { Action, SHOW_USER_PAGE } from "../types";
import * as actionCreators from "../../action_creators";

async function getUser(id) {
  let userGetRequest = await fetch(
    `http://mri2189.badlee.com/user.php?userid=${id}`
  );
  let user = await userGetRequest.json();
  return user;
}

export default async function showUserPage(
  store,
  next: Function,
  action: SHOW_USER_PAGE
) {
  try {
    await store.dispatch(actionCreators.startLoading());

    let user = await getUser(action.id);
    if (user) {
      action.user = user;
      next(action);

      action.route.params = { isOtherProfile: true };
      await store.dispatch(actionCreators.navigate(action.route));
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
