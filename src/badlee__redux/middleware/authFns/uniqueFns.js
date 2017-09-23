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
  try {
    let email = action.email;
    let userRequest = await fetch(
      `http://mri2189.badlee.com/user.php?email=${email}`
    );
    if (userRequest.status === 200 && userRequest.ok) {
      var user = await userRequest.text();
      if (user.indexOf("required credentials missing") === -1) {
        store.dispatch(actionCreators.addError("Email already exists"));
      } else {
        throw "Email already exists";
      }
    }
  } catch (err) {
    store.dispatch(actionCreators.clearError(err));
  }
}

export async function checkUsernameUniqueness(store, next, action) {
  try {
    let username = action.username;
    let userRequest = await fetch(
      `http://mri2189.badlee.com/user.php?username=${username}`
    );
    if (userRequest.status === 200 && userRequest.ok) {
      var user = await userRequest.text();
      if (user.indexOf("required credentials missing") === -1) {
        store.dispatch(actionCreators.addError("Username already exists"));
      } else {
        throw "Username already exists";
      }
    }
  } catch (err) {
    store.dispatch(actionCreators.clearError(err));
  }
}
