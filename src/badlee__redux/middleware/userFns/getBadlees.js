/**
 * @name- getBadlees
 * 
 * @chill- Not knowing why, not knowing why- This is my foundation: Not knowing why. -Saichi
 * 
 * 
 * @description- Gets user badlee by id and category passed
 * 
 * @author- heartit pirates were here
 */
import * as actionCreators from '../../action_creators';

("use strict");
export default async function getBadlees(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());

    let badleeRequest = await fetch(
      `http://mri2189.badlee.com/posts.php?userid=${action.id}&purpose=${action.purpose}`
    );

    if (badleeRequest.ok && badleeRequest.status === 200) {
      let badlees = await badleeRequest.json();
      action.badlees = badlees;
      next(action);
    } else {
      throw "error happened in get badlee";
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
