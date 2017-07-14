/**
 * Preferring simplicity and freedom, Practicing not-doing. Everything will fall into places - Lao Tzu
 * 
 * 
 * Badlee App Redux Data Store. This is also very critical file for badlee App.
 * It contains the single data source for application and updating it with changes application state.
 * 
 * @author - heartit pirates were here
 */

"use strict";

/**
 * Imp[o]rts Definition :-
 * 
 * createStore -> Creates a Redux store that holds the complete state tree of our app. There is only one single store in app.
 * applyMiddleware -> Middleware is the suggested way to extend Redux with custom functionality. It lets us wrap store's dispatch method for fun and profit.
 * reducer -> Our Redux Store reducing functions
 * Badlee App middlewares 
 */
import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import loginMiddleware from "./middleware/login";
import registerMiddleware from "./middleware/register";
import navigateMiddleware from "./middleware/navigate";
import restoreAuthMiddleware from "./middleware/restore_auth";
import logoutMiddleware from "./middleware/logout";

// List of middleware we are using.
const middleware = [
  loginMiddleware,
  registerMiddleware,
  navigateMiddleware,
  restoreAuthMiddleware,
  logoutMiddleware
];

// In dev enivorement, add logger for redux.
if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");

  middleware.push(logger);
}

/**
 * Our App Store with applied middleware and reducers definition.
 */
export function makeStore() {
  const createUsingMiddleware = applyMiddleware(...middleware)(createStore);
  return createUsingMiddleware(reducer);
}
