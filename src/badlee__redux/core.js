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
    guestUserID: null,
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

export function addNotification(state, notification) {
  return state.setIn(
    ["application", "notifications"],
    state.getIn(["application", "notifications"]).add(notification)
  );
}
export function clearNotification(state, notification) {
  return state.setIn(
    ["application", "notifications"],
    state.getIn(["application", "notifications"]).delete(notification)
  );
}

export function addError(state, error) {
  return state.setIn(
    ["application", "errors"],
    state.getIn(["application", "errors"]).add(error)
  );
}
export function clearError(state, error) {
  return state.setIn(
    ["application", "errors"],
    state.getIn(["application", "errors"]).delete(error)
  );
}

export function clearAllError(state) {
  return state.setIn(
    ["application", "errors"],
    state.getIn(["application", "errors"]).clear()
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

export function clearUser(state) {
  return state
    .setIn(["user", "isLoggedIn"], false)
    .setIn(["user", "loggedUserID"], null);
}

export function saveGuestUser(state, user) {
  let userID = user.user_id;
  let userInformation = {};
  userInformation[userID] = user;
  return state.setIn(
    ["user", "usersInformation"],
    state.getIn(["user", "usersInformation"]).merge(userInformation)
  );
}

export function followUser(state, userID) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let oldFollowers = state.getIn([
    "user",
    "usersInformation",
    userID,
    "follower"
  ]);
  return state.setIn(
    ["user", "usersInformation", userID, "follower"],
    oldFollowers ? oldFollowers.push(loggedUserID) : fromJS([loggedUserID])
  );
}

export function unfollowUser(state, userID) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let oldFollowers = state.getIn([
    "user",
    "usersInformation",
    userID,
    "follower"
  ]);
  return state.setIn(
    ["user", "usersInformation", userID, "follower"],
    oldFollowers.remove(oldFollowers.indexOf(loggedUserID))
  );
}

/**
 * Badlee Core Section
 */
export function getBadlees(state, badlees, tabName, badleesIDS) {
  let badleeObject = {};
  badlees.map(badlee => {
    badleeObject[badlee.id] = badlee;
  });
  var updatedBadlees = state.getIn(["badlees", "data"]).merge(badleeObject);
  return state
    .setIn(["badlees", "data"], updatedBadlees)
    .setIn(["badlees", "tabs", tabName], fromJS(badleesIDS));
}

export function saveBadlee(state, newBadlee) {
  let obj = {};
  obj[newBadlee.id] = newBadlee;
  var updatedBadlees = state.getIn(["badlees", "data"]).merge(obj);
  return state.setIn(["badlees", "data"], updatedBadlees);
}

export function saveUserBadlees(state, userID, purpose, badlees) {
  let tempObj = {};
  let ids = badlees.map(badlee => {
    tempObj[badlee.id] = badlee;
    return badlee.id;
  });
  return state
    .setIn(["badlees", "data"], state.getIn(["badlees", "data"]).merge(tempObj))
    .setIn(["badlees", "users", userID, purpose], fromJS(ids));
}

export function onClickLike(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "likes",
      badlee.get("likes")
        ? badlee.get("likes").push(loggedUserID)
        : fromJS([loggedUser])
    );
  });
}
export function onClickUnlike(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "likes",
      badlee.get("likes").remove(badlee.get("likes").indexOf(loggedUserID))
    );
  });
}

export function onClickWish(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "wishes",
      badlee.get("wishes")
        ? badlee.get("wishes").push(loggedUserID)
        : fromJS([loggedUserID])
    );
  });
}
export function onClickUnwish(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "wishes",
      badlee.get("wishes").remove(badlee.get("wishes").indexOf(loggedUserID))
    );
  });
}

export function postComment(state, id, comment) {
  let oldComments = state.getIn(["badlees", "data", String(id), "comments"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "comments",
      oldComments ? oldComments.push(comment) : fromJS([comment])
    );
  });
}
