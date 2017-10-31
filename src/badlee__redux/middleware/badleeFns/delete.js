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
    console.log(request);
    if (request.status === 200 && request.ok) {
      let response = await request.json();
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
}
