/**
 * name- badlee.js
 * 
 * @chill- Not knowing why, not knowing why- This is my foundation: Not knowing why- Saichi
 * 
 * 
 * @description- This is the main middleware responsible for handling req related to badlees like get or save requests.
 * 
 * @author- heartit pirates were here
 */
import {
  postComment,
  showCommentPage,
  deleteComment
} from "./badleeFns/comment";
import getBadlees from "./badleeFns/get";
import { onClickLike, onClickUnlike } from "./badleeFns/like";
import saveBadlee from "./badleeFns/save";
import { showBadleePage } from "./badleeFns/single";
import { onClickUnwish, onClickWish } from "./badleeFns/wish";
import reportBadlee from "./badleeFns/reportBadlee";
import showReactionPage from "./badleeFns/reaction";

("use strict");

export default store => next => action => {
  switch (action.type) {
    case "GET_BADLEES":
      return getBadlees(store, next, action);
      break;
    case "SAVE_BADLEE":
      return saveBadlee(store, next, action);
      break;
    case "ON_CLICK_LIKE":
      return onClickLike(store, next, action);
      break;
    case "ON_CLICK_UNLIKE":
      return onClickUnlike(store, next, action);
      break;
    case "ON_CLICK_WISH":
      return onClickWish(store, next, action);
      break;
    case "ON_CLICK_UNWISH":
      return onClickUnwish(store, next, action);
      break;
    case "SHOW_COMMENT_PAGE":
      return showCommentPage(store, next, action);
      break;
    case "POST_COMMENT":
      return postComment(store, next, action);
      break;
    case "DELETE_COMMENT":
      return deleteComment(store, next, action);
      break;
    case "SHOW_REACTION_PAGE":
      return showReactionPage(store, next, action);
      break;
    case "SHOW_BADLEE_PAGE":
      return showBadleePage(store, next, action);
      break;
    case "REPORT_BADLEE":
      return reportBadlee(store, next, action);
      break;
    default:
      return next(action);
  }
};
