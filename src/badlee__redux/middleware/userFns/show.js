// @flow
import * as actionCreators from "../../action_creators";

/**
 * @name- show.js
 * 
 * @chill- I live not in myself, but i become Portion of that around me: and to me High mountains are a feeling. -Lord Byron
 * 
 * 
 * @description- Show Other user Page
 * 
 * @author- heartit pirates were here
 */
("use strict");

async function getUser(id) {
  let userGetRequest = await fetch(
    `http://mri2189.badlee.com/user.php?userid=${id}`
  );
  let user = await userGetRequest.json();
  return user;
}

export default async function showUserPage(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());

    let user = await getUser(action.userID);
    if (user) {
      action.user = user;
      next(action);
      await store.dispatch(actionCreators.setActiveUserID(user.user_id));
      action.route.params = { isOtherUser: true };
      await store.dispatch(actionCreators.navigate(action.route));
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
