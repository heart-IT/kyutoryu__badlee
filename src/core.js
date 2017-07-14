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
  loading: false,
  accessToken: undefined,
  loggedIn: false,
  user: undefined,
  isOnline: true,
  navigator: null
});

export const InitialState: State = new StateRecord({
  user: {}
});

export function setNavigator(state: State, navigator: any): State {
  return state.set("navigator", navigator);
}

export function login(state: State, token: string, user: User): State {
  return state
    .set("accessToken", token)
    .set("loggedIn", true)
    .set("user", user);
}

export function register(state: State, user: User): Stte {
  return state.set("loggedIn", true).set("user", user);
}

export function restoreAuth(state: State, token: string, user: User): State {
  return state
    .set("accessToken", token)
    .set("loggedIn", true)
    .set("user", user);
}

export function logout(state: State): State {
  // mark user as logged out
  return state.set("loggedIn", false).set("accessToken", null).set("user", {});
}

export function startLoading(state: State): State {
  // set state as loading
  return state.set("loading", true);
}

export function finishLoading(state: State): State {
  return state.set("loading", false);
}

export function changeInternetConnectionStatus(
  state: State,
  status: boolean
): State {
  return state.set("isOnline", status);
}
