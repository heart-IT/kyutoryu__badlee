"use strict";
import * as actionCreators from "../../action_creators";

const urls = [
  "http://mri2189.badlee.com/posts.php",
  "http://mri2189.badlee.com/search.php",
  "http://mri2189.badlee.com/postbyfollow.php"
];

async function fetchBadlees(url, page, limit) {
  var response = await fetch(url);
  if (response.ok && response.status === 200) {
    var responseJSON = await response.json();
    return responseJSON;
  } else {
    throw "error happened in fetching";
  }
}

async function getBadleesByFollowing(id, offset, limit) {
  console.log(id);
  let badleeFetch = await fetch(
    urls[0] + `?userid=${id}&offset=${offset}&limit=${limit}`
  );
  console.log(badleeFetch);
  if (badleeFetch.ok && badleeFetch.status === 200) {
    var badlees = await badleeFetch.json();
    console.log(badlees);
    return badlees;
  } else {
    throw "error happened in following";
  }
}

async function getBadleesByLocation(location, offset, limit) {
  let badleeFetch = await fetch(
    urls[0] + `?location=${location}&offset=${offset}&limit=${limit}`
  );
  if (badleeFetch.ok && badleeFetch.status === 200) {
    var badlees = await badleeFetch.json();
    return badlees;
  } else {
    throw "error happened in location";
  }
}

async function getBadleesByGlobe(
  search,
  purpose,
  location,
  category,
  page,
  limit
) {
  let url;
  console.log(arguments);
  if (search) {
    url = urls[1] + `?sp=${search}`;
    purpose ? (url += `&spp=${purpose}`) : "";
    category ? (url += `&spc=${category}`) : "";
    location ? (url += `&spl=${location}`) : "";
    url += `&offset=${page}&limit=${limit}`;
  } else {
    url = `${urls[0]}?page=${page}&limit=${limit}`;
  }
  let badleeFetch = await fetch(url);
  if (badleeFetch.ok && badleeFetch.status === 200) {
    var badlees = await badleeFetch.json();
    return badlees;
  } else {
    throw "error happened in globe";
  }
}

export default async function getBadlees(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    console.log(action);
    let {
      tabName,
      page,
      limit,
      globeCategory,
      searchString,
      current__location,
      userID,
      category
    } = action.params;
    let url;
    var badlees;
    var state = store.getState();
    // console.log(state.getIn(["user", "information"]));
    if (tabName === "following") {
      badlees = await getBadleesByFollowing(userID, page, limit);
      action.badlees = badlees;
      action.tabName = tabName;
      action.page__upper__count = page * limit;
      action.badleesInIDS = badlees.map(badlee => badlee.id);
      next(action);
    } else if (tabName === "location") {
      if (
        page * limit >
        state.getIn(["badleesByCategory", "location", "total"])
      ) {
        badlees = await getBadleesByLocation(current__location, page, limit);
        action.badlees = badlees;
        action.tabName = tabName;
        action.page__upper__count = page * limit;
        action.badleesInIDS = badlees.map(badlee => badlee.id);
        next(action);
      }
    } else {
      badlees = await getBadleesByGlobe(
        searchString,
        globeCategory,
        current__location,
        category,
        page,
        limit
      );
      action.badlees = badlees;
      action.tabName = tabName;
      action.page__upper__count = page * limit;
      action.badleesInIDS = badlees.map(badlee => badlee.id);
      next(action);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
