/**
 * @name- utility.js
 * 
 * @chill- What lies behind us and what lies before us are tiny matters compared to what lies within us- Ralph Waldo Emerson
 * 
 * 
 * @description- Utility Reusable Functions for Middleware
 */

import { AsyncStorage } from "react-native";

export const application_id = "xYqBgc1Xcf2Ufyhir5ab";
export const application_secret = "vh4tyy74xAnNLtGagto4";

export function createFormData(formData) {
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
