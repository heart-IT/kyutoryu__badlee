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

export const register = (
  email: string,
  username: string,
  password: string,
  route: Object
): REGISTER => ({
  type: "REGISTER",
  username: username,
  email: email,
  password: password,
  application_id: applicationID,
  application_secret: applicationSecret,
  fname: ["Monkey", "Jiraiya", "Ichigo", "Zoro"][Math.floor(Math.random() * 4)],
  lname: ["D. Luffy", "Ichigo", "Sama", "Lost"][Math.floor(Math.random() * 4)],
  gender: ["Male", "Female", "Shinigami"][Math.floor(Math.random() * 3)],
  avatar: [
    "https://qph.ec.quoracdn.net/main-qimg-c0f2e7c8e5fb40c52acd389e5de0d314",
    "https://ramenchan.files.wordpress.com/2011/12/jiraiya_forever_by_ernie1991-d2ykhfi.png"
  ][Math.floor(Math.random() * 2)],
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
