/**
 * @name- getBadlees
 * 
 * @chill- Not knowing why, not knowing why- This is my foundation: Not knowing why. -Saichi
 * 
 * 
 * @description- Gets user badlee by id and category passed
 * 
 * @author- heartit pirates were here
 */
import * as actionCreators from "../../action_creators";
import { AsyncStorage } from "react-native";

("use strict");
export default async function getBadlees(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    let url = `http://mri2189.badlee.com/posts.php?userid=${action.id}&purpose=${action.purpose}&limit=${action.limit}&offset=${action.offset}`;
    if (action.purpose === "wish") {
      url = `http://mri2189.badlee.com/wish.php?userid=${action.id}&limit=${action.limit}&offset=${action.offset}`;
    }
    let jollyroger = await AsyncStorage.getItem("jollyroger");
    let badleeRequest = await fetch(url, {
      headers: {
        Authorization: jollyroger
      }
    });
    if (badleeRequest.ok && badleeRequest.status === 200) {
      let badlees = await badleeRequest.json();
      action.badlees = badlees;
      next(action);
    } else {
      throw "error happened in get badlee";
    }
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}
