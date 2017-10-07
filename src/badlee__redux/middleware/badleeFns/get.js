/**
 * @name- badleeFns/get.js
 * 
 * @chill- Guarding knowledge is not a good way to understand. Understanding means to throw away your knowledge- Thich Nhat Hanh
 * 
 * 
 * @description- These functions fetch badlee from server based on the param passed. And pass them to store for addition.
 * 
 * @author- heartit pirates were here
 */
import { AsyncStorage } from 'react-native';

import * as actionCreators from '../../action_creators';

("use strict");

const urls = [
  "http://mri2189.badlee.com/postbyfollow.php",
  "http://mri2189.badlee.com/posts.php",
  "http://mri2189.badlee.com/search.php"
];

// this fn checks the tabName, call api fn based on it to get the badlees, and pass it to the store
export default async function getBadlees(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let {
      tabName,
      offset,
      limit,
      currentLocation,
      search,
      category
    } = action.params;
    let storeState = store.getState();
    const gotTill = storeState.getIn([
      "badlees",
      "pagination",
      "tabs",
      tabName,
      "to"
    ]);
    if (offset + limit < gotTill) {
      throw "already has values";
    }
    let badlees;
    if (tabName === "following") {
      badlees = await getBadleesByFollowing(offset, limit);
    } else if (tabName === "location") {
      badlees = await getBadleesByLocation(currentLocation, offset, limit);
    } else {
      badlees = await getBadleesByGlobe(search, category, offset, limit);
    }
    if (badlees === "its over") {
      action.itsEnd = true;
    }
    action.badlees = badlees;
    action.tabName = tabName;
    action.offset = offset;
    action.limit = limit;
    action.badleesInIDS = badlees.map(badlee => badlee.id);
    next(action);
  } catch (e) {
    console.log(e);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

// Calls server api with given offset limit, return list of badlees in case of success.. otherwise throw error
async function getBadleesByFollowing(offset, limit) {
  let jollyroger = await AsyncStorage.getItem("jollyroger");
  let badleeFetch = await fetch(urls[0] + `?offset=${offset}&limit=${limit}`, {
    headers: {
      Authorization: jollyroger
    },
    method: "POST"
  });
  if (badleeFetch.ok && badleeFetch.status === 200) {
    var badlees = await badleeFetch.json();
    if (!badlees) {
      return "its over";
    }
    return badlees;
  } else {
    throw "error happened in following";
  }
}

// Calls server api with given location offset limit, return list of badlees in case of success.. otherwise throw error
async function getBadleesByLocation(location, offset, limit) {
  let badleeFetch = await fetch(
    urls[1] + `?location=${location}&offset=${offset}&limit=${limit}`
  );
  if (badleeFetch.ok && badleeFetch.status === 200) {
    var badlees = await badleeFetch.json();
    return badlees;
  } else {
    throw "error happened in location";
  }
}

// Calls server api with given search, purpose, offset limit, return list of badlees in case of success.. otherwise throw error
async function getBadleesByGlobe(search, purpose, offset, limit) {
  console.log("starting my excavation");
  console.log(search, purpose);
  let jollyroger = await AsyncStorage.getItem("jollyroger");
  let url = search
    ? `${urls[2]}?sp=${search}${purpose ? "&spp=" + purpose : ""}`
    : `${urls[1]}?${purpose ? "&purpose=" + purpose : ""}`;
  url += `&offset=${offset}&limit=${limit}`;
  console.log(url);
  let badleeFetch = await fetch(url, {
    headers: {
      Authorization: jollyroger
    }
  });
  console.log(badleeFetch);
  if (badleeFetch.ok && badleeFetch.status === 200) {
    var badlees = await badleeFetch.json();
    console.log(badlees);
    return badlees;
  } else {
    throw "error happened in globe";
  }
}
