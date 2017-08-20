"use strict";
import { AsyncStorage } from "react-native";
import * as actionCreators from "../action_creators";

async function saveBadlee(store, next, action) {
  try {
    await store.dispatch(actionCreators.startLoading());
    const randomImages = [
      "https://s-media-cache-ak0.pinimg.com/originals/3b/07/6c/3b076c58a2428b5fa6352c3832198fd4.jpg",
      "https://pbs.twimg.com/profile_images/684388992674996224/zYQDMpIo.png",
      "http://pa1.narvii.com/5765/4e02a449452fa70fe41b29219d08c484a9e6c436_hq.gif",
      "http://orig05.deviantart.net/0b1e/f/2011/220/5/8/grimmjow__rape_face_by_kittywillcutyou-d45x00w.jpg"
    ];
    const data = {
      media: action.media
        ? action.media
        : randomImages[Math.floor(Math.random() * 4)],
      description: action.description,
      ip: action.ip,
      location: action.location,
      purpose: action.purpose ? action.purpose : "Show Off",
      category: action.category,
      application_id: "xYqBgc1Xcf2Ufyhir5ab",
      application_secret: "vh4tyy74xAnNLtGagto4"
    };
    const jolly_roger = await AsyncStorage.getItem("jollyroger");
    let formBody = [];
    for (var props in data) {
      var encodedKey = encodeURIComponent(props);
      var encodedValue = encodeURIComponent(data[props]);
      formBody.push(`${encodedKey}=${encodedValue}`);
    }
    formBody = formBody.join("&");
    console.log(data);
    let response = await fetch("http://mri2189.badlee.com/posts.php", {
      method: "POST",
      headers: {
        Authorization: jolly_roger,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formBody
    });
    console.log(response);
    var respnseJson = await response.json();
    console.log(respnseJson);
  } catch (err) {
    console.log(err);
  } finally {
    await store.dispatch(actionCreators.finishLoading());
  }
}

export default store => next => action => {
  if (action.type === "SAVE_BADLEE") {
    return saveBadlee(store, next, action);
  }
  return next(action);
};
