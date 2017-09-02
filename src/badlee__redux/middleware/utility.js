/**
 * @name- utility.js
 * 
 * @chill- What lies behind us and what lies before us are tiny matters compared to what lies within us- Ralph Waldo Emerson
 * 
 * 
 * @description- Utility Reusable Functions for Middleware
 */

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
