/**
 * @name- delete.js
 * 
 * @chill- If a wave only sees its form, with its beginning and end, it will be afraid of birth and death. But if the wave see that it is water, then it will be emancipated from birth and death. -Thich Nhat Hanh
 * 
 * 
 * @description- Delete middleware fns
 * 
 * @author- heartit pirates were here
 */
"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../../action_creators";

export default async function deleteBadlee(store, next, action) {
  try {
    let { badleeID } = action;
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let request = await fetch(
      `http://mri2189.badlee.com/posts.php?postid=${badleeID}`,
      {
        method: "DELETE",
        headers: {
          Authorization: jollyroger
        }
      }
    );
    if (request.status === 200 && request.ok) {
      next(action);
      if (action.goBack) {
        await store.dispatch(actionCreators.goBack());
      }
    }
  } catch (err) {
    console.log(err);
  }
}
