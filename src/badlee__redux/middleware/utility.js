/**
 * 
 * @name- utility.js
 * 
 * @chill- What lies behind us and what lies before us are tiny matters compared to what lies within us- Ralph Waldo Emerson
 * In the absence of regret, bliss arises. This is the way of things. - Buddha
 * 
 * 
 * @description- Utility Reusable Functions for Middleware
 * 
 * @author- heartit pirates were here
 */
import base64 from 'base-64';
import { AsyncStorage } from 'react-native';

export const application_id = "xYqBgc1Xcf2Ufyhir5ab";
export const application_secret = "vh4tyy74xAnNLtGagto4";

export function createFormData(data) {
  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  return formBody;
}

export function getRestoreAuthNextRoute(route, isAuthanticated) {
  let components = route.component;
  let component;
  if (isAuthanticated) {
    component = {
      component: components.authenticated.component,
      reset: true
    };
  } else {
    component = {
      component: components.not__authenticated.component,
      reset: true
    };
  }
  return Object.assign(route, component);
}

export function getNextRoute(route, isVerified) {
  let components = route.component;
  let component;
  if (isVerified) {
    component = {
      component: components.verified,
      reset: true
    };
  } else {
    component = {
      component: components.not_verified,
      reset: true
    };
  }
  return Object.assign(route, component);
}

export async function saveUserInStorage(user, jollyroger) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
  await AsyncStorage.setItem("jollyroger", jollyroger);
  return;
}

export async function saveMedia(mediaData) {
  try {
    if (!mediaData.uri) {
      return { error: false, url: "" };
    }

    var file = {
      uri: mediaData.uri,
      type: mediaData.imageType,
      name: mediaData.fileName
    };

    var body = new FormData();
    body.append("media", file);
    body.append("application_id", application_id);
    body.append("application_secret", application_secret);
    const response = await fetch("http://mri2189.badlee.com/media.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Basic ${base64.encode("yohohoho" + ":" + "jammy2")}`
      },
      body: body
    });
    if (response.ok && response.status === 200) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw "Image couldnot be uploaded";
    }
  } catch (err) {
    console.log(err);
  }
}
