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

export const startLoading = () => ({ type: "START_LOADING" });
export const finishLoading = () => ({ type: "FINISH_LOADING" });

export const changeInternetConnectionStatus = status => ({
  type: "INTERNET_CONNECTION",
  status: status
});

// Auth Middleware Actions
/**
 * Fn to check if a given email is unique
 * @param {string} email Email address which needs to be check for uniqueness
 */
export const checkEmailUniqueness = email => ({
  type: "CHECK_EMAIL_UNIQUENESS",
  email
});
/**
 * Fn to check if a given username is unique
 * @param {string} username Username which needs to be check for uniqueness
 */
export const checkUsernameUniqueness = username => ({
  type: "CHECK_USERNAME_UNIQUENESS",
  username
});
/**
 * Fn triggered when user clicks on Forgot Password
 * @param {string} email Email adderss entered by the user
 */
export const forgotPassword = email => ({
  type: "FORGOT_PASSWORD",
  email: email
});
/**
 * Fn to login a user based on given formData
 * @param {Object} formData Login Form Data
 * @param {Object} route Screen to go to in case of Success login
 */
export const login = (formData, route) => ({
  type: "LOGIN",
  username: formData.username,
  password: formData.password,
  route: route
});
/**
 * Fn to logout a user
 * @param {Object} route Route to go to in case of success Logout
 */
export const logout = route => ({
  type: "LOGOUT",
  route: route
});
/**
 * Fn to register a user based on given formData
 * @param {Object} formData Register Form Data
 * @param {Object} route Screen to go to in case of Success registration
 */
export const register = (formData, route) => ({
  type: "REGISTER",
  username: formData.uniqueName,
  fname: formData.firstName,
  lname: formData.lastName,
  email: formData.email,
  password: formData.password,
  avatarName: formData.avatarName,
  avatarSource: formData.avatarSource,
  avatarType: formData.avatarType,
  dob: formData.dob,
  gender: formData.gender,
  location: formData.location,
  interests: formData.wish,
  route: route
});
/**
 * Fn to check if user was logged from before, if yes auto login him/her
 * @param {Object} route Success route in case of Auth is restored, ie user was logged from before
 */
export const restoreAuth = route => ({
  type: "RESTORE_AUTH",
  route: route
});

// Badlee Middleware Actions
/**
 * Fn to fetch badlee data from the server.
 * @param {Object} params Parameter according to which badlees are to be fetched
 */
export const getBadlees = params => ({
  type: "GET_BADLEES",
  params: params
});
/**
 * Fn to like a badlee in store as well as API request
 * @param {string} badleeID ID of the badlee like was done
 * @param {Boolean} force Whether to force update like in store without calling API.
 */
export const onClickLike = (badleeID, force) => ({
  type: "ON_CLICK_LIKE",
  badleeID: badleeID,
  force: force
});
/**
 * Fn to unlike a badlee in store as well as API request
 * @param {string} badleeID ID of the badlee unlike was done
 * @param {Boolean} force Whether to force update unlike in store without calling API.
 */
export const onClickUnlike = (badleeID, force) => ({
  type: "ON_CLICK_UNLIKE",
  badleeID: badleeID,
  force: force
});
/**
 * Fn to wish a badlee in store as well as API request
 * @param {string} badleeID ID of the badlee wish was done
 * @param {Boolean} force Whether to force update wish in store without calling API.
 */
export const onClickWish = (badleeID, force) => ({
  type: "ON_CLICK_WISH",
  badleeID: badleeID,
  force: force
});
/**
 * Fn to unwish a badlee in store as well as API request
 * @param {string} badleeID ID of the badlee unwish was done
 * @param {Boolean} force Whether to force update unwish in store without calling API.
 */
export const onClickUnwish = (badleeID, force) => ({
  type: "ON_CLICK_UNWISH",
  badleeID: badleeID,
  force: force
});
/**
 * Fn to post comment on badlee
 * @param {string} badleeID ID of the badlee on which comment was done 
 * @param {string} comment Comment added by user
 */
export const onCommentPost = (badleeID, comment) => ({
  badleeID: badleeID,
  comment: comment,
  type: "POST_COMMENT"
});
/**
 * Fn to delete comment on badlee
 * @param {string} commentID ID of the comment
 */
export const onCommentDelete = commentID => ({
  commentID: commentID,
  type: "DELETE_COMMENT"
});
/**
 * Fn to report a badlee
 * @param {string} badleeID ID of the badlee reported
 * @param {string} reason Reason of reporting
 */
export const reportPost = (badleeID, reason) => ({
  badleeID: badleeID,
  reason: reason,
  type: "REPORT_BADLEE"
});
/**
 * Fn to Save a badlee based on given formData
 * @param {Object} formData Badlee Form Data
 * @param {Object} route Screen to go to in case of Badlee Registration
 */
export const saveBadlee = (formData, route) => ({
  type: "SAVE_BADLEE",
  uri: formData.uri,
  imageType: formData.imageType,
  fileName: formData.fileName,
  description: formData.description,
  ip: formData.ip,
  location: formData.location,
  purpose: formData.purpose,
  category: formData.category,
  route: route
});
/**
 * Fn to set BadleeID in store so that it can be used for other pages, like reaction and comments etc
 * @param {string} badleeID ID of the badlee to be setted active
 */
export const setActiveBadleeID = badleeID => ({
  badleeID: badleeID,
  type: "SET_ACTIVE_BADLEE_ID"
});
/**
 * Fn to show Badlee Page
 * @param {String} badleeID ID of the badlee showing
 * @param {Object} route badlee Page
 */
export const showBadleePage = (badleeID, route) => ({
  badleeID: badleeID,
  route: route,
  type: "SHOW_BADLEE_PAGE"
});
/**
 * Fn to show Comment Page
 * @param {String} badleeID ID of the badlee showing
 * @param {Object} route Comment Page
 */
export const showCommentPage = (badleeID, route) => ({
  badleeID: badleeID,
  route: route,
  type: "SHOW_COMMENT_PAGE"
});
/**
 * Fn to show Reaction Page
 * @param {String} badleeID ID of the badlee showing
 * @param {Object} route Reaction Page
 */
export const showReactionPage = (badleeID, route) => ({
  badleeID: badleeID,
  route: route,
  type: "SHOW_REACTION_PAGE"
});

export const deleteBadlee = badleeID => ({
  badleeID: badleeID,
  type: "DELETE_BADLEE"
});

// Navigator Middleware Actions
/**
 * Fn to back back to previous screen
 */
export const goBack = () => ({
  type: "GO_BACK"
});
/**
 * Fn to navigate to a different screen(route)
 * @param {Object} route Information of route to navigate to
 */
export const navigate = route => ({
  type: "NAVIGATE_TO",
  route: route
});
/**
 * Fn to set navigator object in store
 * @param {Navigator Object} navigator 
 */
export const setNavigator = navigator => ({
  type: "SET_NAVIGATOR",
  navigator: navigator
});

// Notification Middleware Action
/**
 * Fn to add notification 
 * @param {string} notification Notification to add
 */
export const addError = error => ({
  type: "ADD_ERROR",
  error: error
});
export const addNotification = notification => ({
  type: "ADD_NOTIFICATION",
  notification: notification
});
export const checkForNotification = () => ({
  type: "CHECK_NOTIFICATION"
});
export const clearAllErrors = () => ({
  type: "CLEAR_ALL_ERRORS"
});
export const clearAllNotification = () => ({
  type: "CLEAR_NOTIFICATION"
});
export const clearError = error => ({
  type: "CLEAR_ERROR",
  error: error
});
export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION"
});

// User Middleware Action
/**
 * 
 * @param {string} userID ID of the user
 * @param {string} purpose Purpose of which badlees are to be fetched [showoff, exchange, ..]
 * @param {number} offset Offset
 * @param {number} limit Limit
 */
export const getUserBadlees = (userID, purpose, offset, limit) => ({
  userID: userID,
  purpose: purpose,
  offset: offset,
  limit: limit,
  type: "GET_USER_BADLEES"
});
/**
 * Fn to follow given user
 * @param {string} userID ID of the user to follow
 */
export const onFollowUser = userID => ({
  userID: userID,
  type: "FOLLOW_USER"
});
/**
 * Fn to unfollow given user
 * @param {string} userID ID of the user to unfollow
 */
export const onUnfollowUser = userID => ({
  userID: userID,
  type: "UNFOLLOW_USER"
});
/**
 * Fn to search User based on given string
 * @param {string} search Search string inputted by user.
 */
export const searchForUser = search => ({
  type: "SEARCH_USER",
  search: search
});
/**
 * Fn to show User Page
 * @param {String} userID ID of the user showing
 * @param {Object} route Single User Page
 */
export const showUserPage = (userID, route) => ({
  type: "SHOW_USER_PAGE",
  userID: userID,
  route: route
});
/**
 * Fn to set Active User
 * @param {string} userID ID of the user currently watching
 */
export const setActiveUserID = userID => ({
  userID: userID,
  type: "USER_SHOWING"
});

export const updateUser = data => ({
  avatarName: data.avatarName,
  avatarSource: data.avatarSource,
  avatarType: data.avatarType,
  avatar: data.avatar,
  dob: data.dob,
  gender: data.gender,
  location: data.location,
  interests: data.wish,
  type: "UPDATE_USER"
});
