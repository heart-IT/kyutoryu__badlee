"use strict";
import * as actionCreators from "../../action_creators";

async function fetchBadlees(url, page, limit) {
  var response = await fetch(url);
  if (response.ok && response.status === 200) {
    var responseJSON = await response.json();
    return responseJSON;
  } else {
    throw "error happened in fetching";
  }
}

export default async function getBadlees(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let { category, page, limit, globeCategory, searchString } = action.params;
    console.log(action.params);
    let url;
    if (category === "location") {
      url = `http://mri2189.badlee.com/posts.php?location=jaipur, rajasthan, india&page=${page}&limit=${limit}`;
    } else if (category === "globe") {
      url = `http://mri2189.badlee.com/posts.php?&page=${page}&limit=${limit}`;
      if (globeCategory) {
        url += "&spp=" + globeCategory;
      }
      if (searchString) {
        url += "&sp=" + searchString;
      }
    }
    let badlees = await fetchBadlees(url, page, limit);
    action.badlees = badlees;
    action.category = category;
    action.IDS = badlees.map(badlee => badlee.id);
    next(action);
  } catch (e) {
    console.log(e);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
