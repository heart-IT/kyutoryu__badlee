// @flow
import { fromJS, Map, OrderedSet, Record, Set } from 'immutable';

/**
 * @name- core.js
 * 
 * @chill- The source of true happiness is living in ease and freedom, fully experiencing the wonders of life--
 * Being aware of what is going on in the present moment, free from both clinging and aversion - Thich Nhat Hanh
 * 
 * 
 * @description- Core function that actually updates Application State
 * 
 * @author - heartit pirates were here.
 */

("use strict");

/**
 * Imp[o]rts Definition :-
 * 
 * Record -> A record is similar to a JS object, but enforces a specific set of allowed string keys, and have default Value.
 * 
 * user -> 
 *  badleeCategory = {userId: {exchange: [], showoff: [], shoutout: []}}
 *  guestUsers = {userId: {information}} 
 */

const StateRecord = Record({
  application: new Map({
    navigator: null,
    isLoading: false,
    isOnline: true,
    errors: new Set(),
    notifications: new Set()
  }),
  user: new Map({
    isLoggedIn: false,
    loggedUserID: null,
    usersInformation: fromJS({})
  }),
  badlees: new Map({
    data: fromJS({}),
    tabs: new Map({
      following: new OrderedSet(),
      location: new OrderedSet(),
      globe: new OrderedSet()
    }),
    users: new Map({
      exchange: fromJS({}),
      showoff: fromJS({}),
      shoutout: fromJS({})
    })
  })
});

export const InitialState = new StateRecord();

/**
 * Application methods
 */
export function setNavigator(state, navigator) {
  return state.setIn(["application", "navigator"], navigator);
}

export function startLoading(state) {
  return state.setIn(["application", "isLoading"], true);
}

export function finishLoading(state) {
  return state.setIn(["application", "isLoading"], false);
}

export function changeInternetConnectionStatus(state, status) {
  return state.setIn(["application", "isOnline"], status);
}

export function addAppNotification(state: State, notification: String): State {
  return state.setIn(["application", "notification"], notification);
}
export function clearAppNotification(
  state: State,
  notification: String
): State {
  return state.setIn(["application", "notification"], null);
}

export function addError(state: State, error: String): State {
  return state.setIn(
    ["application", "error"],
    state.getIn(["application", "error"]).add(error)
  );
}
export function clearError(state: State, error: String): State {
  return state.setIn(
    ["application", "error"],
    state.getIn(["application", "error"]).delete(error)
  );
}

export function clearAllError(state: State): State {
  return state.setIn(
    ["application", "error"],
    state.getIn(["application", "error"]).clear()
  );
}

/**
 * Auth Functions
 */

export function addLoggedUser(state, user) {
  let userID = user.user_id;
  let userInformation = {};
  userInformation[userID] = user;
  return state
    .setIn(["user", "isLoggedIn"], true)
    .setIn(["user", "loggedUserID"], userID)
    .setIn(
      ["user", "usersInformation"],
      state.getIn(["user", "usersInformation"]).merge(userInformation)
    );
}

// Function called when user logsout of app. Remove user from the app
export function clearUser(state: State): State {
  return state
    .setIn(["user", "isLoggedIn"], false)
    .setIn(["user", "information"], new Map());
}

/**
 * Badlee Core Section
 */
export function getBadlees(state, badlees, tabName, badleesIDS) {
  console.log("gold digging here");
  console.log(badlees, tabName, badleesIDS);
  let badleeObject = {};
  badlees.map(badlee => {
    badleeObject[badlee.id] = badlee;
  });
  var updatedBadlees = state.get("allBadlees").merge(badleeObject);
  return state
    .set("allBadlees", updatedBadlees)
    .setIn(["badleesByCategory", tabName, "ids"], fromJS(badleesIDS));
}

export function saveBadlee(state, newBadlee) {
  let obj = {};
  obj[newBadlee.id] = newBadlee;
  var updatedBadlees = state.get("allBadlees").merge(obj);
  return state.set("allBadlees", updatedBadlees);
}

export function saveUserBadlees(state, userID, purpose, badlees) {
  let tempObj = {};
  let ids = badlees.map(badlee => {
    tempObj[badlee.id] = badlee;
    return badlee.id;
  });
  return state
    .set("allBadlees", state.get("allBadlees").merge(tempObj))
    .setIn(["usersMeta", userID, purpose], ids);
}

export function saveGuestUser(state: State, user) {
  return state.set("guestUser", fromJS(user));
}
export function followUser(state: State) {
  let oldFollowers = state.getIn(["guestUser", "follower"]);
  let loggedUser = state.getIn(["user", "information", "user_id"]);
  return state.setIn(
    ["guestUser", "follower"],
    oldFollowers ? oldFollowers.push(loggedUser) : fromJS([loggedUser])
  );
}
export function unfollowUser(state: State) {
  let oldFollowers = state.getIn(["guestUser", "follower"]);
  let loggedUser = state.getIn(["user", "information", "user_id"]);
  return state.setIn(
    ["guestUser", "follower"],
    oldFollowers.remove(oldFollowers.indexOf(loggedUser))
  );
}

export function onClickLike(state: State, id: String) {
  let loggedUser = state.getIn(["user", "information", "user_id"]);
  return state.updateIn(["allBadlees", String(id)], badlee => {
    return badlee.set(
      "likes",
      badlee.get("likes")
        ? badlee.get("likes").push(loggedUser)
        : fromJS([loggedUser])
    );
  });
}
export function onClickUnlike(state: State, id: String) {
  let loggedUser = state.getIn(["user", "information", "user_id"]);
  return state.updateIn(["allBadlees", String(id)], badlee => {
    return badlee.set(
      "likes",
      badlee.get("likes").remove(badlee.get("likes").indexOf(loggedUser))
    );
  });
}

export function onClickWish(state: State, id: String) {
  let loggedUser = state.getIn(["user", "information", "user_id"]);
  return state.updateIn(["allBadlees", String(id)], badlee => {
    return badlee.set(
      "wishes",
      badlee.get("wishes")
        ? badlee.get("wishes").push(loggedUser)
        : fromJS([loggedUser])
    );
  });
}
export function onClickUnwish(state: State, id: String) {
  let loggedUser = state.getIn(["user", "information", "user_id"]);
  return state.updateIn(["allBadlees", String(id)], badlee => {
    return badlee.set(
      "wishes",
      badlee.get("wishes").remove(badlee.get("wishes").indexOf(loggedUser))
    );
  });
}

export function saveTempBadlee(state: State, id: String) {
  return state.set("tempBadlee", state.getIn(["allBadlees", String(id)]));
}

export function postComment(state: State, id: String, comment: Object) {
  let oldComments = state.getIn(["tempBadlee", "comments"]);
  return state
    .updateIn(["allBadlees", String(id)], badlee => {
      return badlee.set(
        "comments",
        oldComments ? oldComments.push(comment) : fromJS([comment])
      );
    })
    .setIn(
      ["tempBadlee", "comments"],
      oldComments ? oldComments.push(comment) : fromJS([comment])
    );
}
