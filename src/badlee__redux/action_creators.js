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

export const setNavigator = navigator => ({
  type: "SET_NAVIGATOR",
  navigator: navigator
});

export const restoreAuth = route => ({
  type: "RESTORE_AUTH",
  route: route
});

export const startLoading = () => ({ type: "START_LOADING" });
export const finishLoading = () => ({ type: "FINISH_LOADING" });

export const changeInternetConnectionStatus = status => ({
  type: "INTERNET_CONNECTION",
  status: status
});

export const navigate = (route: ?Object): NAVIGATE_TO => ({
  type: "NAVIGATE_TO",
  route: route
});

export const goBack = () => ({
  type: "GO_BACK"
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

export const checkEmailUniqueness = email => ({
  type: "CHECK_EMAIL_UNIQUENESS",
  email
});

export const checkUsernameUniqueness = username => ({
  type: "CHECK_USERNAME_UNIQUENESS",
  username
});

export const logout = (route: ?Object): LOGOUT => ({
  type: "LOGOUT",
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

export const saveBadlee = (data, route) => ({
  type: "SAVE_BADLEE",
  data: data,
  route: route
});

export const onClickLike = (id: Number) => ({
  type: "ON_CLICK_LIKE",
  id: id
});
export const store_likeBadlee = id => ({
  type: "STORE_LIKE_BADLEE",
  id: id
});

export const onClickUnlike = (id: Number) => ({
  type: "ON_CLICK_UNLIKE",
  id: id
});
export const store_unlikeBadlee = id => ({
  type: "STORE_UNLIKE_BADLEE",
  id: id
});

export const onClickWish = (id: Number) => ({
  type: "ON_CLICK_WISH",
  id: id
});
export const store_wishBadlee = id => ({
  type: "STORE_WISH_BADLEE",
  id: id
});

export const onClickUnwish = (id: Number) => ({
  type: "ON_CLICK_UNWISH",
  id: id
});
export const store_unwishBadlee = id => ({
  type: "STORE_UNWISH_BADLEE",
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
export const showReactionPage = (id, route) => ({
  id: id,
  route: route,
  type: "SHOW_REACTION_PAGE"
});

export const postComment = (id, comment) => ({
  id: id,
  comment: comment,
  type: "POST_COMMENT"
});
export const deleteComment = id => ({
  id: id,
  type: "DELETE_COMMENT"
});
export const currentShowingBadlee = id => ({
  id: id,
  type: "STORE_CURRENTSHOWINGBADLEE"
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

export const reportPost = (id, reason) => ({
  id: id,
  reason: reason,
  type: "REPORT_BADLEE"
});

export const checkForNotification = () => ({
  type: "CHECK_NOTIFICATION"
});
