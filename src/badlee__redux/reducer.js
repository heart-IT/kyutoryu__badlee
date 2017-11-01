// @flow
import * as core from "./core";

/**
 * @name- reducer.js
 * 
 * @chill- Even a blade of grass trembling in the evening breeze cannot be known so long as we are unable to merge our particular selves
 * with the self of grass - Soyen Shaku
 * 
 * 
 * @description- This function catches the action dispatch and update the application state.
 * 
 * @author - heartit pirates were here.
 */

("use strict");

export function reducer(state = core.InitialState, action) {
  switch (action.type) {
    case "START_LOADING":
      return core.startLoading(state);
      break;
    case "FINISH_LOADING":
      return core.finishLoading(state);
      break;
    case "INTERNET_CONNECTION":
      return core.changeInternetConnectionStatus(state, action.status);
      break;
    case "LOGIN":
      return core.addLoggedUser(state, action.user);
      break;
    case "LOGOUT":
      return core.clearUser(state);
      break;
    case "REGISTER":
      return core.addLoggedUser(state, action.user);
      break;
    case "RESTORE_AUTH":
      return core.addLoggedUser(state, action.user);
      break;
    case "GET_BADLEES":
      return core.getBadlees(
        state,
        action.listEnd,
        action.tabName,
        action.badlees,
        action.offset,
        action.limit,
        action.isSearching
      );
    case "ON_CLICK_LIKE":
      return core.likeBadlee(state, action.badleeID);
      break;
    case "ON_CLICK_UNLIKE":
      return core.unlikeBadlee(state, action.badleeID);
      break;
    case "ON_CLICK_WISH":
      return core.wishBadlee(state, action.badleeID);
      break;
    case "ON_CLICK_UNWISH":
      return core.unwishBadlee(state, action.badleeID);
      break;
    case "SAVE_BADLEE":
      return core.saveBadlee(state, action.newBadlee);
      break;
    case "SET_ACTIVE_BADLEE_ID":
      return core.setActiveBadleeID(state, action.badleeID);
      break;
    case "SHOW_BADLEE_PAGE":
      return core.saveSingleBadlee(state, action.badlee);
      break;
    case "SET_NAVIGATOR":
      return core.setNavigator(state, action.navigator);
      break;
    case "ADD_ERROR":
      return core.addError(state, action.error);
      break;
    case "ADD_NOTIFICATION":
      return core.addNotification(state, action.notification);
      break;
    case "CLEAR_ALL_ERRORS":
      return core.clearAllError(state);
      break;
    case "CLEAR_ERROR":
      return core.clearError(state, action.error);
      break;
    case "CLEAR_NOTIFICATION":
      return core.clearNotification(state);
      break;

    case "SHOW_USER_PAGE":
      return core.saveGuestUser(state, action.user);
      break;
    case "FOLLOW_USER":
      return core.followUser(state, action.userID, action.followObject);
      break;
    case "UNFOLLOW_USER":
      return core.unfollowUser(state, action.userID);
      break;
    case "UPDATE_USER":
      return core.updateUser(
        state,
        action.avatar,
        action.dob,
        action.location,
        action.interests,
        action.gender
      );
      break;
    case "GET_USER_BADLEES":
      return core.saveUserBadlees(
        state,
        action.userID,
        action.purpose,
        action.badlees
      );
      break;

    case "POST_COMMENT":
      return core.postComment(
        state,
        action.comment_id,
        action.comment,
        action.timestamp
      );
      break;
    case "DELETE_COMMENT":
      return core.deleteComment(state, action.commentID);
      break;
    case "REPORT_BADLEE":
      return core.reportBadlee(state, action.reportItem);
      break;

    case "CHECK_NOTIFICATION":
      return core.checkNotification(
        state,
        action.notificationByID,
        action.order
      );
    case "SEARCH_USER":
      return core.searchUser(state, action.users, action.usersID);
      break;
    case "USER_SHOWING":
      return core.userShowing(state, action.userID);
      break;
    case "DELETE_BADLEE":
      return core.deleteBadlee(state, action.badleeID);
      break;
    default:
      return state;
  }
}
