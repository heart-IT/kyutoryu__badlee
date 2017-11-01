/**
 * @name- core.js
 * 
 * @chill- The source of true happiness is living in ease and freedom, fully experiencing the wonders of life--
 * Being aware of what is going on in the present moment, free from both clinging and aversion - Thich Nhat Hanh
 * 
 * 
 * @description- Core function that actually updates Application State
 * 
 * @author - heartit pirates were here.
 */

"use strict";
import { fromJS, Map, OrderedSet, Record, Set } from "immutable";
import { locale } from "moment";

/**
 * Imp[o]rts Definition :-
 * 
 * Record -> A record is similar to a JS object, but enforces a specific set of allowed string keys, and have default Value.
 * 
 * user -> 
 *  badleeCategory = {userId: {exchange: [], showoff: [], shoutout: []}}
 *  guestUsers = {userId: {information}} 
 */

const StateRecord = Record({
  application: new Map({
    navigator: null,
    isLoading: false,
    isOnline: true,
    errors: new Set(),
    notifications: new Set()
  }),
  user: new Map({
    activeUserID: null,
    loggedUserID: null,
    data: fromJS({}),
    searching: fromJS([])
  }),
  badlees: new Map({
    activeBadleeID: null,
    data: fromJS({}),
    reports: fromJS([]),
    purposeTabs: new Map({
      following: new OrderedSet(),
      location: new OrderedSet(),
      globe: new OrderedSet()
    }),
    userTabs: new Map({
      exchange: new Map({}),
      shoutoff: new Map({}),
      shoutout: new Map({}),
      wish: new Map({})
    }),
    pagingEndsIn: new Map({
      tabs: new Map({
        following: -1,
        location: -1,
        globe: -1
      })
    })
  }),
  notifications: new Map({
    data: fromJS({}),
    order: new OrderedSet()
  })
});

export const InitialState = new StateRecord();

/**
 * Application methods
 */
export function setNavigator(state, navigator) {
  return state.setIn(["application", "navigator"], navigator);
}

export function startLoading(state) {
  return state.setIn(["application", "isLoading"], true);
}

export function finishLoading(state) {
  return state.setIn(["application", "isLoading"], false);
}

export function changeInternetConnectionStatus(state, status) {
  return state.setIn(["application", "isOnline"], status);
}

export function addNotification(state, notification) {
  return state.setIn(
    ["application", "notifications"],
    state.getIn(["application", "notifications"]).add(notification)
  );
}
export function clearNotification(state, notification) {
  return state.setIn(
    ["application", "notifications"],
    state.getIn(["application", "notifications"]).clear()
  );
}

export function addError(state, error) {
  return state.setIn(
    ["application", "errors"],
    state.getIn(["application", "errors"]).add(error)
  );
}
export function clearError(state, error) {
  return state.setIn(
    ["application", "errors"],
    state.getIn(["application", "errors"]).delete(error)
  );
}

export function clearAllError(state) {
  return state.setIn(
    ["application", "errors"],
    state.getIn(["application", "errors"]).clear()
  );
}

/**
 * Auth Functions
 */

export function addLoggedUser(state, user) {
  let userID = user.user_id;
  let userLoggedIDPath = ["user", "loggedUserID"];
  let userActiveIDPath = ["user", "activeUserID"];
  let userDataPath = ["user", "data"];
  let userInformation = {};
  userInformation[userID] = user;
  return state
    .setIn(userLoggedIDPath, userID)
    .setIn(userActiveIDPath, userID)
    .setIn(userDataPath, state.getIn(userDataPath).merge(userInformation));
}

export function clearUser(state) {
  return state.setIn(["user", "loggedUserID"], null).set(
    "notifications",
    new Map({
      data: fromJS({}),
      order: new OrderedSet()
    })
  );
}

export function saveGuestUser(state, user) {
  let userID = user.user_id;
  let userInformation = {};
  userInformation[userID] = user;
  return state
    .setIn(
      ["user", "data"],
      state.getIn(["user", "data"]).merge(userInformation)
    )
    .setIn(["user", "guestUserID"], userID);
}
// let likeObject = {
//   avatar: loggedUser.get("avatar"),
//   user_id: loggedUser.get("user_id"),
//   name: loggedUser.get("fname") + " " + loggedUser.get("lname"),
//   username: loggedUser.get("username")
// };
// return state.updateIn(["badlees", "data", String(id)], badlee => {
//   return badlee.set(
//     "likes",
//     badlee.get("likes")
//       ? badlee.get("likes").push(fromJS(likeObject))
//       : fromJS([likeObject])
//   );
// });
export function followUser(state, userID, followObject) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let loggedUser = state.getIn(["user", "data", loggedUserID]);

  let followingObject = followObject;
  let followerObject = {
    avatar: loggedUser.get("avatar"),
    user_id_follower: loggedUserID,
    name: loggedUser.get("fname") + " " + loggedUser.get("lname"),
    username: loggedUser.get("username")
  };
  let targetUser = state.getIn(["user", "data", userID]);
  if (targetUser) {
    return state
      .updateIn(["user", "data", userID], user => {
        return user.set(
          "follower",
          user.get("follower")
            ? user.get("follower").push(fromJS(followerObject))
            : fromJS([followerObject])
        );
      })
      .updateIn(["user", "data", loggedUserID], user => {
        return user.set(
          "following",
          user.get("following")
            ? user.get("following").push(fromJS(followingObject))
            : fromJS([followingObject])
        );
      });
  } else {
    return state.updateIn(["user", "data", loggedUserID], user => {
      return user.set(
        "following",
        user.get("following")
          ? user.get("following").push(fromJS(followingObject))
          : fromJS([followingObject])
      );
    });
  }
}

export function unfollowUser(state, userID) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let targetUser = state.getIn(["user", "data", userID]);
  if (targetUser) {
    return state
      .updateIn(["user", "data", userID], user => {
        let oldFollowers = user.get("follower")
          ? user.get("follower")
          : fromJS([]);
        let newFollowers = oldFollowers.filter(
          follower => follower.get("user_id_follower") !== loggedUserID
        );
        return user.set("follower", newFollowers);
      })
      .updateIn(["user", "data", loggedUserID], user => {
        let oldFollowings = user.get("following")
          ? user.get("following")
          : fromJS([]);
        let newFollowings = oldFollowings.filter(
          following => following.get("user_id_following") !== userID
        );
        return user.set("following", newFollowings);
      });
  } else {
    return state.updateIn(["user", "data", loggedUserID], user => {
      let oldFollowings = user.get("following")
        ? user.get("following")
        : fromJS([]);
      let newFollowings = oldFollowings.filter(
        following => following.get("user_id_following") !== userID
      );
      return user.set("following", newFollowings);
    });
  }
}

/**
 * Badlee Core Section
 */
export function getBadlees(
  state,
  listEnd,
  tabName,
  badlees,
  offset,
  limit,
  isSearching
) {
  if (listEnd) {
    return state.setIn(
      ["badlees", "pagingEndsIn", "tabs", tabName],
      offset - limit
    );
  } else {
    let badleeObject = {};
    var badleeIDs = badlees.map(badlee => {
      let id = badlee.id;
      badleeObject[id] = badlee;
      return id;
    });
    var updatedBadlees = state.getIn(["badlees", "data"]).merge(badleeObject);
    var updatedBadleeIDS;
    if (offset === 0) {
      if (isSearching) {
        updatedBadleeIDS = OrderedSet(badleeIDs);
      } else {
        updatedBadleeIDS = OrderedSet(badleeIDs).union(
          state.getIn(["badlees", "purposeTabs", tabName])
        );
      }
    } else {
      updatedBadleeIDS = state
        .getIn(["badlees", "purposeTabs", tabName])
        .union(badleeIDs);
    }
    return state
      .setIn(["badlees", "data"], updatedBadlees)
      .setIn(["badlees", "purposeTabs", tabName], updatedBadleeIDS);
  }
}

export function saveBadlee(state, newBadlee) {
  let user = state.getIn([
    "user",
    "data",
    state.getIn(["user", "loggedUserID"])
  ]);
  let followingTab = state.getIn(["badlees", "purposeTabs", "following"]);
  let locationTab = state.getIn(["badlees", "purposeTabs", "location"]);
  let globeTab = state.getIn(["badlees", "purposeTabs", "globe"]);
  let obj = {};
  newBadlee.comment_count = 0;
  newBadlee["user_info"] = {
    avatar: user.get("avatar"),
    username: user.get("username"),
    user_id: user.get("user_id"),
    First_name: user.get("fname"),
    Last_name: user.get("lname")
  };
  newBadlee["wishes"] = [];
  newBadlee["user"] = user.get("user_id");
  newBadlee["likes"] = [];
  newBadlee["comments"] = [];

  obj[newBadlee.id] = newBadlee;
  var updatedBadlees = state.getIn(["badlees", "data"]).merge(obj);
  if (user.get("location") === newBadlee.location) {
    return state
      .setIn(["badlees", "data"], updatedBadlees)
      .setIn(
        ["badlees", "purposeTabs", "following"],
        followingTab
          ? OrderedSet([newBadlee.id]).merge(followingTab)
          : OrderedSet([newBadlee.id])
      )
      .setIn(
        ["badlees", "purposeTabs", "following"],
        locationTab
          ? OrderedSet([newBadlee.id]).merge(locationTab)
          : OrderedSet([newBadlee.id])
      )
      .setIn(
        ["badlees", "purposeTabs", "globe"],
        globeTab
          ? OrderedSet([newBadlee.id]).merge(globeTab)
          : OrderedSet([newBadlee.id])
      );
  } else {
    return state
      .setIn(["badlees", "data"], updatedBadlees)
      .setIn(
        ["badlees", "purposeTabs", "following"],
        followingTab
          ? OrderedSet([newBadlee.id]).merge(followingTab)
          : OrderedSet([newBadlee.id])
      )
      .setIn(
        ["badlees", "purposeTabs", "globe"],
        globeTab
          ? OrderedSet([newBadlee.id]).merge(globeTab)
          : OrderedSet([newBadlee.id])
      );
  }
}
// purposeTabs: new Map({
//   following: new OrderedSet(),
//   location: new OrderedSet(),
//   globe: new OrderedSet()
// }),
// userTabs: new Map({
//   exchange: new Map({}),
//   shoutoff: new Map({}),
//   shoutout: new Map({}),
//   wish: new Map({})
// }),

export function saveUserBadlees(state, userID, purpose, badlees) {
  let tempObj = {};
  let ids = badlees.map(badlee => {
    tempObj[badlee.id] = badlee;
    return badlee.id;
  });
  let oldIDS = state.getIn(["badlees", "userTabs", purpose, userID])
    ? state.getIn(["badlees", "userTabs", purpose, userID])
    : OrderedSet([]);

  return state
    .setIn(["badlees", "data"], state.getIn(["badlees", "data"]).merge(tempObj))
    .setIn(
      ["badlees", "userTabs", purpose, userID],
      OrderedSet(ids).union(oldIDS)
    );
}

export function saveSingleBadlee(state, badlee) {
  let obj = {};
  return state.setIn(
    ["badlees", "data"],
    state.getIn(["badlees", "data"]).set(obj)
  );
}

export function likeBadlee(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let loggedUser = state.getIn(["user", "data", loggedUserID]);
  let likeObject = {
    avatar: loggedUser.get("avatar"),
    user_id: loggedUser.get("user_id"),
    name: loggedUser.get("fname") + " " + loggedUser.get("lname"),
    username: loggedUser.get("username")
  };
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "likes",
      badlee.get("likes")
        ? badlee.get("likes").push(fromJS(likeObject))
        : fromJS([likeObject])
    );
  });
}
export function unlikeBadlee(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    let oldLikes = badlee.get("likes");
    let newLikes = oldLikes.filter(
      like => like.get("user_id") !== loggedUserID
    );
    return badlee.set("likes", newLikes);
  });
}

export function wishBadlee(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let loggedUser = state.getIn(["user", "data", loggedUserID]);
  let wishObject = {
    avatar: loggedUser.get("avatar"),
    user_id: loggedUser.get("user_id"),
    name: loggedUser.get("fname") + " " + loggedUser.get("lname"),
    username: loggedUser.get("username")
  };
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    return badlee.set(
      "wishes",
      badlee.get("wishes")
        ? badlee.get("wishes").push(fromJS(wishObject))
        : fromJS([wishObject])
    );
  });
}
export function unwishBadlee(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  return state.updateIn(["badlees", "data", String(id)], badlee => {
    let oldWishes = badlee.get("wishes");
    let newWishes = oldWishes.filter(
      wish => wish.get("user_id") !== loggedUserID
    );
    return badlee.set("wishes", newWishes);
  });
}

export function setActiveBadleeID(state, badleeID) {
  return state.setIn(["badlees", "activeBadleeID"], String(badleeID));
}

export function postComment(state, id, comment, timestamp) {
  var badleeId = state.getIn(["badlees", "activeBadleeID"]);
  let oldComments = state.getIn(["badlees", "data", badleeId, "comments"]);
  let loggedUser = state.getIn([
    "user",
    "data",
    state.getIn(["user", "loggedUserID"])
  ]);
  var commentObj = {
    avatar: loggedUser.get("avatar"),
    content: comment,
    fname: loggedUser.get("fname"),
    user_id: loggedUser.get("user_id"),
    timestamp: timestamp,
    comment_id: id
  };
  return state.updateIn(["badlees", "data", badleeId], badlee => {
    return badlee
      .set(
        "comments",
        oldComments ? oldComments.unshift(commentObj) : fromJS([commentObj])
      )
      .set("comment_count", oldComments ? oldComments.size + 1 : 1);
  });
}
export function deleteComment(state, id) {
  var badleeId = state.getIn(["badlees", "activeBadleeID"]);
  let oldComments = state.getIn(["badlees", "data", badleeId, "comments"]);
  let newComments = oldComments.filter(comment => {
    return (comment.comment_id || comment.get("comment_id")) !== id;
  });
  return state.updateIn(["badlees", "data", badleeId], badlee => {
    return badlee
      .set("comments", newComments)
      .set("comment_count", oldComments.size - 1);
  });
}

export function checkNotification(state, notificationByID, order) {
  let currentData = state.getIn(["notifications", "data"]);
  let updatedData = currentData.merge(notificationByID);
  let currentOrder = state.getIn(["notifications", "order"]);
  let updatedOrder = OrderedSet(order).union(currentOrder);
  return state
    .setIn(["notifications", "data"], updatedData)
    .setIn(["notifications", "order"], updatedOrder);
}

export function reportBadlee(state, reportItem) {
  return state.setIn(
    ["badlees", "reports"],
    state.getIn(["badlees", "reports"]).push(reportItem)
  );
}

export function searchUser(state, users, usersID) {
  return state
    .setIn(["user", "data"], state.getIn(["user", "data"]).merge(users))
    .setIn(["user", "searching"], usersID);
}

export function userShowing(state, userID) {
  return state.setIn(["user", "activeUserID"], userID);
}

export function updateUser(state, avatar, dob, location, interests, gender) {
  return state.updateIn(
    ["user", "data", state.getIn(["user", "loggedUserID"])],
    user => {
      return user
        .set("avatar", avatar ? avatar : user.get("avatar"))
        .set("interests", interests)
        .set("gender", gender)
        .set("location", location)
        .set("dob", dob);
    }
  );
}

export function deleteBadlee(state, badleeID) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let followingTab = state.getIn(["badlees", "purposeTabs", "following"]);
  let locationTab = state.getIn(["badlees", "purposeTabs", "location"]);
  let globeTab = state.getIn(["badlees", "purposeTabs", "globe"]);
  let exchangeTab = state.getIn([
    "badlees",
    "userTabs",
    "exchange",
    loggedUserID
  ]);
  let showoffTab = state.getIn([
    "badlees",
    "userTabs",
    "showoff",
    loggedUserID
  ]);
  let shoutoutTab = state.getIn([
    "badlees",
    "userTabs",
    "shoutout",
    loggedUserID
  ]);
  let wishTab = state.getIn(["badlees", "userTabs", "wish", loggedUserID]);
  return state
    .setIn(
      ["badlees", "data"],
      state.getIn(["badlees", "data"]).delete(badleeID)
    )
    .setIn(
      ["badlees", "purposeTabs", "following"],
      followingTab ? followingTab.delete(badleeID) : OrderedSet([])
    )
    .setIn(
      ["badlees", "purposeTabs", "location"],
      locationTab ? locationTab.delete(badleeID) : OrderedSet([])
    )
    .setIn(
      ["badlees", "purposeTabs", "globe"],
      globeTab ? globeTab.delete(badleeID) : OrderedSet([])
    )
    .setIn(
      ["badlees", "userTabs", "exchange", loggedUserID],
      exchangeTab ? exchangeTab.delete(badleeID) : OrderedSet([])
    )
    .setIn(
      ["badlees", "userTabs", "showoff", loggedUserID],
      showoffTab ? showoffTab.delete(badleeID) : OrderedSet([])
    )
    .setIn(
      ["badlees", "userTabs", "shoutout", loggedUserID],
      shoutoutTab ? shoutoutTab.delete(badleeID) : OrderedSet([])
    )
    .setIn(
      ["badlees", "userTabs", "wish", loggedUserID],
      wishTab ? wishTab.delete(badleeID) : OrderedSet([])
    );
}
