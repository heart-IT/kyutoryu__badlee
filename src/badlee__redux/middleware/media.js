// @flow

/**
 * In the absence of regret, bliss arises. This is the way of things. - Buddha
 */
"use strict";

import base64 from "base-64";

export default async function saveMedia(action) {
  var file = {
    uri: action.uri,
    type: action.imageType,
    name: action.fileName
  };

  var body = new FormData();
  body.append("media", file);
  body.append("application_id", "xYqBgc1Xcf2Ufyhir5ab");
  body.append("application_secret", "vh4tyy74xAnNLtGagto4");
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
    return { error: true };
  }
}
