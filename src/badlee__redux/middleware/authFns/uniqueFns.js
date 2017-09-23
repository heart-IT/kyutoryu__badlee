/**
 * @name- uniqueFns
 * 
 * @chill- There is no where to arrive except the present moment.- Thich Nhat Hanh
 * 
 * 
 * @description- Unique Checking Functions
 * 
 * @author- heartit pirates were here
 */
import * as actionCreators from '../../action_creators';

export async function checkEmailUniqueness(store, next, action) {
  let email = action.email;
  let userRequest = await fetch(
    `http://mri2189.badlee.com/user.php?email=${email}`
  );
  if (userRequest.status === 200 && userRequest.ok) {
    var user = await userRequest.json();
    if (user.user_id) {
      store.dispatch(actionCreators.addError("Email already exists"));
    } else {
      throw "email does not exist";
    }
  } else {
    store.dispatch(actionCreators.clearError("Email already exists"));
  }
}

export async function checkUsernameUniqueness(store, next, action) {
  let username = action.username;
  let userRequest = await fetch(
    `http://mri2189.badlee.com/user.php?username=${username}`
  );
  if (userRequest.status === 200 && userRequest.ok) {
    var user = await userRequest.json();
    if (user.user_id) {
      store.dispatch(actionCreators.addError("Username already exists"));
    } else {
      throw "username does not exist";
    }
  } else {
    store.dispatch(actionCreators.clearError("Username already exists"));
  }
}
