// @flow
import { fromJS, Map, OrderedSet, Record, Set } from "immutable";
import { locale } from "moment";

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

("use strict");

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
    isLoggedIn: false,
    loggedUserID: null,
    guestUserID: null,
    usersInformation: fromJS({})
  }),
  badlees: new Map({
    data: fromJS({}),
    tabs: new Map({
      following: new OrderedSet(),
      location: new OrderedSet(),
      globe: new OrderedSet()
    }),
    users: fromJS({}),
    currentShowing: null,
    pagingEndsIn: new Map({
      tabs: new Map({
        following: -1,
        location: -1,
        globe: -1
      })
    })
  }),
  notifications: new Map({
    dataByID: fromJS({}),
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
    state.getIn(["application", "notifications"]).delete(notification)
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
  let userInformation = {};
  userInformation[userID] = user;
  return state
    .setIn(["user", "isLoggedIn"], true)
    .setIn(["user", "loggedUserID"], userID)
    .setIn(
      ["user", "usersInformation"],
      state.getIn(["user", "usersInformation"]).merge(userInformation)
    );
}

export function clearUser(state) {
  return state
    .setIn(["user", "isLoggedIn"], false)
    .setIn(["user", "loggedUserID"], null);
}

export function saveGuestUser(state, user) {
  let userID = user.user_id;
  let userInformation = {};
  userInformation[userID] = user;
  return state
    .setIn(
      ["user", "usersInformation"],
      state.getIn(["user", "usersInformation"]).merge(userInformation)
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
export function followUser(state, userID) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let loggedUser = state.getIn(["user", "usersInformation", loggedUserID]);
  let userFollowing = state.getIn(["user", "usersInformation", userID]);

  let followingObject = {
    user_id_following: userID
  };
  if (userFollowing) {
    let followObject = {
      avatar: loggedUser.get("avatar"),
      user_id_follower: loggedUser.get("user_id"),
      name: loggedUser.get("fname") + " " + loggedUser.get("lname"),
      username: loggedUser.get("username")
    };
    return state
      .updateIn(["user", "usersInformation", userID], user => {
        return user.set(
          "follower",
          user.get("follower")
            ? user.get("follower").push(fromJS(followObject))
            : fromJS([followObject])
        );
      })
      .updateIn(["user", "usersInformation", loggedUserID], user => {
        return user.set(
          "following",
          user.get("following")
            ? user.get("following").push(fromJS(followingObject))
            : fromJS([followingObject])
        );
      });
  } else {
    return state.updateIn(["user", "usersInformation", loggedUserID], user => {
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
  if (state.getIn(["user", "usersInformation", userID])) {
    return state
      .updateIn(["user", "usersInformation", userID], user => {
        console.log(user);
        let oldFollowers = user.get("follower");
        let newFollowers = oldFollowers.filter(
          follower => follower.get("user_id_following") !== loggedUserID
        );
        return user.set("follower", newFollowers);
      })
      .updateIn(["user", "usersInformation", loggedUserID], user => {
        let oldFollowings = user.get("following");
        let newFollowings = oldFollowings.filter(
          following => following.get("user_id_following") !== loggedUserID
        );
        return user.set("following", newFollowings);
      });
  } else {
    return state.updateIn(["user", "usersInformation", loggedUserID], user => {
      let oldFollowings = user.get("following");
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
          state.getIn(["badlees", "tabs", tabName])
        );
      }
    } else {
      updatedBadleeIDS = state
        .getIn(["badlees", "tabs", tabName])
        .union(badleeIDs);
    }
    return state
      .setIn(["badlees", "data"], updatedBadlees)
      .setIn(["badlees", "tabs", tabName], updatedBadleeIDS);
  }
}

export function saveBadlee(state, newBadlee) {
  let obj = {};
  obj[newBadlee.id] = newBadlee;
  var updatedBadlees = state.getIn(["badlees", "data"]).merge(obj);
  return state.setIn(["badlees", "data"], updatedBadlees);
}

export function saveUserBadlees(state, userID, purpose, badlees) {
  let tempObj = {};
  let ids = badlees.map(badlee => {
    tempObj[badlee.id] = badlee;
    return badlee.id;
  });

  return state
    .setIn(["badlees", "data"], state.getIn(["badlees", "data"]).merge(tempObj))
    .setIn(["badlees", "users", userID, purpose], fromJS(ids));
}

export function likeBadlee(state, id) {
  let loggedUserID = state.getIn(["user", "loggedUserID"]);
  let loggedUser = state.getIn(["user", "usersInformation", loggedUserID]);
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
  let loggedUser = state.getIn(["user", "usersInformation", loggedUserID]);
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

export function currentShowingBadlee(state, id) {
  return state.setIn(["badlees", "currentShowing"], String(id));
}

export function postComment(state, id, comment, timestamp) {
  var badleeId = state.getIn(["badlees", "currentShowing"]);
  let oldComments = state.getIn(["badlees", "data", badleeId, "comments"]);
  let loggedUser = state.getIn([
    "user",
    "usersInformation",
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
      .set("comment_count", oldComments.size + 1);
  });
}
export function deleteComment(state, id) {
  var badleeId = state.getIn(["badlees", "currentShowing"]);
  let oldComments = state.getIn(["badlees", "data", badleeId, "comments"]);
  let newComments = oldComments.filter(
    comment => comment.get("comment_id") !== id
  );
  return state.updateIn(["badlees", "data", badleeId], badlee => {
    return badlee
      .set("comments", newComments)
      .set("comment_count", oldComments.size - 1);
  });
}

export function checkNotification(state, notificationByID, order) {
  let currentData = state.getIn(["notifications", "dataByID"]);
  let updatedData = currentData.merge(notificationByID);
  let currentOrder = state.getIn(["notifications", "order"]);
  let updatedOrder = OrderedSet(order).union(currentOrder);
  return state
    .setIn(["notifications", "dataByID"], updatedData)
    .setIn(["notifications", "order"], updatedOrder);
}
