/**
 * @name- store.js
 * 
 * @chill- Preferring simplicity and freedom, Practicing not-doing. Everything will fall into places - Lao Tzu
 * 
 * 
 * @description- Main Badlee Redux Store.
 * It is the single source of data upon which application is running. Updating it will trigger change in application.
 * Flow of store works like => action is dispatch -> action_creators -> [middlewares] -> reducer -> core -> state is updated -> changes in ui are seen
 * 
 * @author - heartit pirates were here
 */

"use strict";

/**
 * Imp[o]rts Definition :-
 * 
 * createStore -> Creates a Redux store to hold state tree of our app. There is only one single store.
 * applyMiddleware -> Middleware is the suggested way to extend Redux with custom functionality. It lets us wrap store's dispatch method for fun and profit.
 * reducer -> Our Redux Store reducing functions
 * navigateMiddleware -> Handles navigating application
 * authMiddleware -> Handles auth related functions like [restore_auth, login, register, forgotPassword, updateUser ,logout]
 * badleeMiddleware -> Handles badlee related functions like [getting badlees, liking etc]
 */
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import navigateMiddleware from "./middleware/navigate";
import authMiddleWare from "./middleware/auth";
import badleeMiddleware from "./middleware/badlee";
import userMiddleware from "./middleware/user";

const middleware = [
  navigateMiddleware,
  authMiddleWare,
  badleeMiddleware,
  userMiddleware
];

// In dev enivorement, add logger for redux.
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}

// Create store and attach middlewares to it. return it after binding it to reducer functions.
export function makeStore() {
  const createUsingMiddleware = applyMiddleware(...middleware)(createStore);
  return createUsingMiddleware(reducer);
}
