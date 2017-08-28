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

export const login = (formData: Object, route: Object): LOGIN => ({
  type: "LOGIN",
  username: formData.username,
  password: formData.password,
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

export const addNotification = (notification: String) => ({
  type: "ADD_ERROR",
  notification: notification
});
export const clearNotification = () => ({
  type: "CLEAR_ERROR"
});
export const addError = (error: String) => ({
  type: "ADD_ERROR",
  error: error
});
export const clearError = () => ({
  type: "CLEAR_ERROR"
});

// badlee section
export const saveBadlee = (data: Object, route: Object) => ({
  type: "SAVE_BADLEE",
  data: data,
  route: route
});

export const forgotPassword = (email: String) => ({
  type: "FORGOT_PASSWORD",
  email: email
});
