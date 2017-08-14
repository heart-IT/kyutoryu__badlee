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
import { Record } from "immutable";
import type { State, User } from "./types";

const StateRecord = Record({
  isLoading: false,
  isLoggedIn: false,
  isOnline: true,
  navigator: null,
  user: undefined,
  badlees: null,
  badleeOrderIDS: {
    followers: null,
    nearby: null,
    shoutouts: null
  },
  friends: null,
  messages: null,
  notifications: null
});

export const InitialState: State = new StateRecord({
  user: {},
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
  return state.set("navigator", navigator);
}

export function startLoading(state: State): State {
  return state.set("isLoading", true);
}

export function finishLoading(state: State): State {
  return state.set("isLoading", false);
}

export function changeInternetConnectionStatus(
  state: State,
  status: boolean
): State {
  return state.set("isOnline", status);
}

export function login(state: State, user: User): State {
  return state.set("isLoggedIn", true).set("user", user);
}

export function register(state: State, user: User): State {
  return state.set("isLoggedIn", true).set("user", user);
}

export function restoreAuth(state: State, user: User): State {
  return state.set("isLoggedIn", true).set("user", user);
}

export function logout(state: State): State {
  return state.set("isLoggedIn", false).set("user", {});
}
