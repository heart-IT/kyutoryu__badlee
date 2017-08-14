/**
 * @flow
 */

/**
 * The source of true happiness is living in ease and freedom, fully experiencing the wonders of life--
 * Being aware of what is going on in the present moment, free from both clinging and aversion - Thich Nhat Hanh
 * 
 * 
 * As the name suggests, this file contains all the core function that updates the State.
 * 
 * @author - heartit pirates were here.
 */
"use strict";

/**
 * Imp[o]rts Definition :-
 * 
 * Record -> A record is similar to a JS object, but enforces a specific set of allowed string keys, and have default Value.
 */
import { Record, Map } from "immutable";
import type { State, User } from "./types";

const StateRecord = Record({
  user: undefined,
  applicationStatus: Map({
    isLoggedIn: false,
    isOnline: true,
    navigator: null,
    isLoading: false
  }),
  badlees: null,
  badleeOrderIDS: Map({
    followers: null,
    nearby: null,
    shoutouts: null
  }),
  friends: null,
  messages: null,
  notifications: null
});

export const InitialState: State = new StateRecord({
  user: {},
  applicationStatus: Map({
    isLoggedIn: false,
    isOnline: true,
    navigator: null,
    isLoading: false
  }),
  badlees: [],
  badleeOrderIDS: {
    followers: [],
    nearby: [],
    shoutouts: []
  },
  friends: [],
  messages: [],
  notifications: []
});

export function setNavigator(state: State, navigator: any): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.navigator = navigator;
  return state.set("applicationStatus", applicationStatus);
}

export function startLoading(state: State): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isLoading = true;
  return state.set("applicationStatus", applicationStatus);
}

export function finishLoading(state: State): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isLoading = false;
  return state.set("applicationStatus", applicationStatus);
}

export function changeInternetConnectionStatus(
  state: State,
  status: boolean
): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isOnline = status;
  return state.set("applicationStatus", applicationStatus);
}

export function login(state: State, user: User): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isLoggedIn = true;
  return state.set("applicationStatus", applicationStatus).set("user", user);
}

export function register(state: State, user: User): Stte {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isLoggedIn = true;
  return state.set("applicationStatus", applicationStatus).set("user", user);
}

export function restoreAuth(state: State, user: User): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isLoggedIn = true;
  return state.set("applicationStatus", applicationStatus).set("user", user);
}

export function logout(state: State): State {
  let applicationStatus = state.get("applicationStatus");
  applicationStatus.isLoggedIn = false;
  return state.set("applicationStatus", applicationStatus).set("user", {});
}
