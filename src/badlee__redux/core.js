/**
 * @flow
 */

/**
 * The source of true happiness is living in ease and freedom, fully experiencing the wonders of life--
 * Being aware of what is going on in the present moment, free from both clinging and aversion - Thich Nhat Hanh
 * 
 * 
 * As the name suggests, this file contains all the core function that updates the State.
 * @name- core
 * @description- Core Function that actually contains and change the application state.
 * @author - heartit pirates were here.
 */
"use strict";

/**
 * Imp[o]rts Definition :-
 * 
 * Record -> A record is similar to a JS object, but enforces a specific set of allowed string keys, and have default Value.
 */
import { Record, Map, List, Set, OrderedSet } from "immutable";
import type { State, User } from "./types";

const StateRecord = Record({
  application: new Map({
    isLoading: false,
    isOnline: true,
    error: null,
    navigator: null,
    notification: null
  }),
  user: new Map({
    isLoggedIn: false,
    information: undefined,
    followers: new List()
  }),
  allBadlees: new List(),
  badleesByCategory: new Map({
    location: new Map({
      ids: new OrderedSet(),
      total: 0
    }),
    globe: new Map({
      ids: new OrderedSet(),
      total: 0
    })
  }),
  messages: new List(),
  notifications: new List()
});

export const InitialState: State = new StateRecord();

export function setNavigator(state: State, navigator: any): State {
  return state.setIn(["application", "navigator"], navigator);
}

export function addAppNotification(state: State, notification: String): State {
  return state.setIn(["application", "notification"], notification);
}
export function clearAppNotification(state: State): State {
  return state.setIn(["application", "notification"], null);
}
export function addError(state: State, error): State {
  return state.setIn(["application", "error"], error);
  // let currentErrorState = previousError.push(error);
  // let distinctErrorState = currentErrorState.distinct;
  // return state.setIn(["application", "errors"], distinctErrorState);
}

export function clearError(state: State): State {
  return state.setIn(["application", "error"], null);
}

export function startLoading(state: State): State {
  return state.setIn(["application", "isLoading"], true);
}

export function finishLoading(state: State): State {
  return state.setIn(["application", "isLoading"], false);
}

export function changeInternetConnectionStatus(
  state: State,
  status: boolean
): State {
  return state.setIn(["application", "isOnline"], status);
}

export function restoreAuth(state: State, user: User): State {
  return state
    .setIn(["user", "isLoggedIn"], true)
    .setIn(["user", "information"], user);
}

export function saveUser(state: State, user: User): State {
  return state
    .setIn(["user", "isLoggedIn"], true)
    .setIn(["user", "information"], user);
}

export function register(state: State, user: User): State {
  return state
    .setIn(["user", "isLoggedIn"], true)
    .setIn(["user", "information"], user);
}

export function logout(state: State): State {
  return state
    .setIn(["user", "isLoggedIn"], false)
    .setIn(["user", "information"], undefined);
}

/**
 * Badlee Core Section
 */
export function getBadlees(
  state,
  badlees,
  tabName,
  badleesIDS,
  pageUpperLimit
) {
  console.log("got values here", badlees, tabName, badleesIDS);
  var updatedBadlees = state.get("allBadlees").merge(badlees);
  var updatedIDS = state
    .getIn(["badleesByCategory", tabName, "ids"])
    .union(badleesIDS);
  var distinctBadlees = updatedBadlees
    .groupBy(x => x.id)
    .map(x => x.first())
    .toList();
  console.log("got values here", updatedBadlees.toJS(), updatedIDS.toJS());
  return state
    .set("allBadlees", updatedBadlees)
    .setIn(["badleesByCategory", tabName, "ids"], updatedIDS);
}
