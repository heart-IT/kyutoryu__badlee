/**
 * @name- search.js
 * 
 * @chill- How can you perceive Oneness? When your words run out-there it is. -Lao Tzu
 * 
 * 
 * @description- Middleware for searching user
 * 
 * @author- heartit pirates were here
 */
"use strict";

export default async function searchUser(store, next, action) {
  try {
    let req = await fetch(
      `http://mri2189.badlee.com/search.php?su=${action.search}`
    );
    if (req.status === 200 && req.ok) {
      let res = await req.json();
      console.log(res);
      let users = {};
      let usersID = res.map(function(user) {
        users[user.user_id] = user;
        return user.user_id;
      });
      action.users = users;
      action.usersID = usersID;
      next(action);
    }
  } catch (err) {
    action.users = {};
    action.usersID = [];
    next(action);
  }
}
