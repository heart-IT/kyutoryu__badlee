// @flow
/**
 * @chill- To observe the impermanence of things is not to reject them, but to be in contact with them with deep understanding, without being caught in desire and attachent - Thich Nhat Hanh
 * 
 * @name- action_creators.js
 * @description- This file function are called by the application to connect to the redux store. These are action factories of our.
 * @author- heartit p[i]rates
 */
"use strict";

import type {
  LOGIN,
  LOGOUT,
  RESTORE_AUTH,
  START_LOADING,
  FINISH_LOADING,
  CHANGE_CONNECTION_STATUS
} from "./types";
import { applicationID, applicationSecret } from "./../fixtures";

export const setNavigator = (navigator: any) => ({
  type: "SET_NAVIGATOR",
  navigator: navigator
});

export const navigate = (route: ?Object) => ({
  type: "NAVIGATE_TO",
  route: route
});

export const register = (userObject: Object, route: Object): REGISTER => ({
  type: "REGISTER",
  userObject: userObject,
  route: route
});

export const login = (
  username: string,
  password: string,
  route: Object
): LOGIN => ({
  type: "LOGIN",
  username: username,
  password: password,
  route: route
});

export const logout = (route: ?Object): LOGOUT => ({
  type: "LOGOUT",
  route: route
});

export const restoreAuth = (route: ?Object = null): RESTORE_AUTH => ({
  type: "RESTORE_AUTH",
  route: route
});

export const startLoading = (): START_LOADING => ({ type: "START_LOADING" });

export const finishLoading = (): FINISH_LOADING => ({ type: "FINISH_LOADING" });

export const changeInternetConnectionStatus = (
  status: boolean
): CHANGE_CONNECTION_STATUS => ({
  type: "INTERNET_CONNECTION",
  status: status
});

// badlee section
export const saveBadlee = (
  media: string,
  description: string,
  ip: string,
  location: string,
  purpose: string,
  category: string
) => ({
  type: "SAVE_BADLEE",
  media: media,
  description: description,
  ip: ip,
  location: location,
  purpose: purpose,
  category: category
});
