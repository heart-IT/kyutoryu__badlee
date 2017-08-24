/**
 * @chill- Preferring simplicity and freedom, Practicing not-doing. Everything will fall into places - Lao Tzu
 * 
 * @description- Badlee Redux Data Store.
 * It contains the single source of data for the application and updating it will change application state.
 * action_creators -> middlewares -> reducer -> core
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
import navigateMiddleware from "./middleware/navigate";
import loginMiddleware from "./middleware/login";
import registerMiddleware from "./middleware/register";
import restoreAuthMiddleware from "./middleware/restore_auth";
import logoutMiddleware from "./middleware/logout";
import BadleeMiddleware from "./middleware/badlee";
import MediaMiddleware from "./middleware/media";

// List of middleware we are using.
const middleware = [
  navigateMiddleware,
  loginMiddleware,
  registerMiddleware,
  restoreAuthMiddleware,
  logoutMiddleware,
  BadleeMiddleware,
  MediaMiddleware
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
