// @flow

/**
 * @name- action_creators.js
 * 
 * @chill- To observe the impermanence of things is not to reject them, but to be in contact with them with deep understanding, without being caught in desire and attachent - Thich Nhat Hanh
 * 
 * 
 * @description- This file function are called by the application to connect to the redux store. These creates actions for the store to use and update.
 * 
 * @author- heartit p[i]rates
 */

"use strict";

import type {
  CHANGE_CONNECTION_STATUS,
  SET_NAVIGATOR,
  NAVIGATE_TO,
  START_LOADING,
  FINISH_LOADING,
  LOGIN,
  REGISTER,
  LOGOUT,
  RESTORE_AUTH,
  FORGOT_PASSWORD,
  ADD_NOTIFICATION,
  CLEAR_NOTIFICATION,
  ADD_ERROR,
  CLEAR_ERROR,
  GET_BADLEES,
  SAVE_BADLEE
} from "./types";

export const changeInternetConnectionStatus = (
  status: boolean
): CHANGE_CONNECTION_STATUS => ({
  type: "INTERNET_CONNECTION",
  status: status
});

export const setNavigator = (navigator: any): SET_NAVIGATOR => ({
  type: "SET_NAVIGATOR",
  navigator: navigator
});

export const startLoading = (): START_LOADING => ({ type: "START_LOADING" });

export const finishLoading = (): FINISH_LOADING => ({ type: "FINISH_LOADING" });

export const navigate = (route: ?Object): NAVIGATE_TO => ({
  type: "NAVIGATE_TO",
  route: route
});

export const login = (formData: Object, route: ?Object): LOGIN => ({
  type: "LOGIN",
  username: formData.username,
  password: formData.password,
  route: route
});

export const register = (userObject: Object, route: ?Object): REGISTER => ({
  type: "REGISTER",
  username: userObject.uniqueName,
  fname: userObject.firstName,
  lname: userObject.lastName,
  email: userObject.email,
  password: userObject.password,
  avatarName: userObject.avatarName,
  avatarSource: userObject.avatarSource,
  avatarType: userObject.avatarType,
  dob: userObject.date,
  gender: userObject.gender,
  location: userObject.location,
  interests: userObject.wish,
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

export const forgotPassword = (email: String): FORGOT_PASSWORD => ({
  type: "FORGOT_PASSWORD",
  email: email
});

export const addNotification = (notification: String): ADD_NOTIFICATION => ({
  type: "ADD_NOTIFICATION",
  notification: notification
});

export const clearNotification = (): CLEAR_NOTIFICATION => ({
  type: "CLEAR_NOTIFICATION"
});

export const addError = (error: String): ADD_ERROR => ({
  type: "ADD_ERROR",
  error: error
});

export const clearError = (error: String): CLEAR_ERROR => ({
  type: "CLEAR_ERROR",
  error: error
});

export const clearAllErrors = (): CLEAR_ALL_ERRORS => ({
  type: "CLEAR_ALL_ERRORS"
});

// badlee section
export const getBadlees = (params: Object): GET_BADLEES => ({
  type: "GET_BADLEES",
  params: params
});

export const saveBadlee = (data: Object, route: ?Object): SAVE_BADLEE => ({
  type: "SAVE_BADLEE",
  data: data,
  route: route
});

export const onClickLike = (id: Number) => ({
  type: "ON_CLICK_LIKE",
  id: id
});

export const onClickUnlike = (id: Number) => ({
  type: "ON_CLICK_UNLIKE",
  id: id
});

export const onClickWish = (id: Number) => ({
  type: "ON_CLICK_WISH",
  id: id
});

export const onClickUnwish = (id: Number) => ({
  type: "ON_CLICK_UNWISH",
  id: id
});

// user section
export const showUserPage = (id: Number, route: ?Object): SHOW_USER_PAGE => ({
  type: "SHOW_USER_PAGE",
  id: id,
  route: route
});

export const followUser = (id: Number) => ({
  id: id,
  type: "FOLLOW_USER"
});

export const unFollowUser = (id: Number) => ({
  id: id,
  type: "UNFOLLOW_USER"
});

export const showCommentPage = (id: Number, route: ?Object) => ({
  id: id,
  route: route,
  type: "SHOW_COMMENT_PAGE"
});

export const saveTempBadlee = (id: Number) => ({
  id: id,
  type: "SAVE_TEMP_BADLEE"
});

export const postComment = (id: Number, comment: String) => ({
  id: id,
  comment: comment,
  type: "POST_COMMENT"
});

export const showBadleePage = (id: Number, route: ?Object) => ({
  id: id,
  route: route,
  type: "SHOW_BADLEE_PAGE"
});

export const getUserBadlees = (id, purpose) => ({
  id: id,
  purpose: purpose,
  type: "GET_USER_BADLEES"
});
