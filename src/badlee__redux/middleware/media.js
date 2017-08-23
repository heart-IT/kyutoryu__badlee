// @flow

/**
 * In the absence of regret, bliss arises. This is the way of things. - Buddha
 */
"use strict";

import * as actionCreators from "../action_creators";

async function saveMedia(store, next: Function, action) {
  await store.dispatch(actionCreators.startLoading());
  var data = {
    uri: action.uri
  };
  console.log(data);
  next(action);
}

export default store => (next: Function) => action => {
  if (action.type === "SAVEMEDIA") {
    return saveMedia(store, next, action);
  }
  return next(action);
};
