// @flow

/**
 * @name- types.js
 * 
 * @chill- The Master detaches herself from all things: Therefore she is united with all things.
 * She gives no thoughts to self. Therefore she is perfectly fulfilled - Lao Tzu
 * 
 * 
 * @description- This file contains Flow object types definition used in the App.
 * 
 * @author- heartit pirates were here
 */

"use strict";

/**
 * Imp[o]rts Definition :-
 * 
 * Record - A record is similar to JS object, but enforce a specific set of allowed string keys, and have default value
 */
import type { Record as RecordType } from "immutable";

export type Dispatch = Function;

/**
 * Application Objects
 */
export type User = {|
  username: string,
  fname: string,
  lname: string,
  email: string,
  password: string,
  avatar: string,
  dob: string,
  location: string,
  interests: string,
  gender: string
|};

export type User = User;

/**
 * Action Objects
 */

export type CHANGE_CONNECTION_STATUS = {|
  type: "INTERNET_CONNECTION",
  status: boolean
|};

export type SET_NAVIGATOR = {|
  type: "SET_NAVIGATOR",
  navigator: any
|};

export type NAVIGATE_TO = {|
  type: "NAVIGATE_TO",
  route: ?Object
|};

export type START_LOADING = {|
  type: "START_LOADING"
|};

export type FINISH_LOADING = {|
  type: "FINISH_LOADING"
|};

export type LOGIN = {|
  type: "LOGIN",
  username: string,
  password: string,
  route: ?Object
|};

export type REGISTER = {|
  type: "REGISTER",
  username: string,
  fname: string,
  lname: string,
  email: string,
  password: string,
  avatarName: string,
  avatarSource: string,
  avatarType: string,
  dob: string,
  gender: string,
  location: string,
  interests: string,
  route: ?Object
|};

export type LOGOUT = {|
  type: "LOGOUT",
  route: ?Object
|};

export type RESTORE_AUTH = {|
  type: "RESTORE_AUTH",
  route: ?Object
|};

export type FORGOT_PASSWORD = {|
  type: "FORGOT_PASSWORD",
  email: string
|};

export type ADD_NOTIFICATION = {|
  type: "ADD_NOTIFICATION",
  notification: string
|};

export type CLEAR_NOTIFICATION = {|
  type: "CLEAR_NOTIFICATION"
|};

export type ADD_ERROR = {|
  type: "ADD_ERROR",
  error: string
|};

export type CLEAR_ERROR = {|
  type: "CLEAR_ERROR",
  error: string
|};

export type CLEAR_ALL_ERRORS = {|
  type: "CLEAR_ALL_ERRORS"
|};

export type GET_BADLEES = {|
  type: "GET_BADLEES",
  params: Object
|};

export type SAVE_BADLEE = {|
  type: "SAVE_BADLEE",
  data: Object,
  route: ?Object
|};

export type Action =
  | CHANGE_CONNECTION_STATUS
  | SET_NAVIGATOR
  | NAVIGATE_TO
  | START_LOADING
  | FINISH_LOADING
  | LOGIN
  | LOGOUT
  | REGISTER
  | RESTORE_AUTH
  | FORGOT_PASSWORD
  | ADD_NOTIFICATION
  | CLEAR_NOTIFICATION
  | ADD_ERROR
  | CLEAR_ERROR
  | GET_BADLEES
  | SAVE_BADLEE;

/**
 * Application State Type. It contains :
 * 1. application -> Contains application related state
   like [isLoading, isOnline, navigator, notification]
 * 2. user -> Contains user related state
   like [isLoggedIn, information, followers]
 * 3. allBadlees -> Contains Main Badlee State which is shown
 * 4. badleesByCategory -> Contains badlee meta information 
   like which badlee from allList needs to show, or order + pagination
 */
export type AppState = {|
  application: ?Object,
  user: ?Object,
  allBadlees: ?Array,
  badleesByCategory: ?Object
|};

export type State = RecordType<AppState>;
