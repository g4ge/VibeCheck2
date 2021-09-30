/*
 * UserRepository maintains all the signed up users in local storage
 */

import { getCurrentDate } from "utils/Date";
import { getAuthUserProfile, setAuthUser, verifyAuthPassword, removeAuthUser } from "./AuthUserRepository";
import { deletePostsByUser, editPostAuthorInfo } from "./PostsRepository";
import { deleteRepliesByUser, editReplyAuthorInfo } from "./RepliesRepository";

const USERS_KEY = "USERS";

function getUsers() {
  // extract all users from local storage
  const users = localStorage.getItem(USERS_KEY);

  // convert json strings to JS object if user exists
  if (users) 
    return JSON.parse(users);

  // return an empty array if no user exists
  return [];
}

function getUserIndex(users, authUser) {
  // iterate over the users and get the user index
  for (const [index, user] of users.entries()) {
    if (authUser.email === user.email) {
      return index;
    }  
  }
  return null;
}

function createUser(form) {
  const users = getUsers();

  // check if there is duplicate user email
  for (const user of users) {
    if (form.email === user.email) {
      return false;
    }
  }

  // otherwise create a new user
  users.push({
    name: form.name,
    email: form.email,
    password: form.password,
    joinedDate: getCurrentDate(),
    avatar: "AvatarUser" // default avatar
  })
  
  // store new user in local storage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

function authenticateUser(form) {
  const users = getUsers();

  // check if user exists and password is matched, then return user info, otherwise return null
  for (const user of users) {
    if (form.email === user.email && form.password === user.password) {
      const authUser = {
        name: user.name,
        email: user.email,
        password: user.password,
        joinedDate: user.joinedDate,
        avatar: user.avatar
      }
      // set current logged in/authenticated user
      setAuthUser(authUser);

      // get current logged in/authenticated user without password
      return getAuthUserProfile();
    }
  }
  return null;
}

function editUser(authUser, form, avatar) {
  // return values
  let error = true;
  let response = "";

  // check if the input password is matched with user password
  if (!verifyAuthPassword(form.curPassword)) {
    response = "Incorrect password. Please try again."
    return {error, response};
  }

  const users = getUsers();
  const userIndex = getUserIndex(users, authUser);

  // check if the input new email is duplicated
  for (const [i, user] of users.entries()) {
    if (form.email === user.email && i !== userIndex) {
      response = "Duplicate email found. Please try again.";
      return {error, response};
    }
  }

  // update author's name and email of all his/her post and replies
  editPostAuthorInfo(authUser.email, form.name, form.email, avatar);
  editReplyAuthorInfo(authUser.email, form.name, form.email, avatar);
  
  // update password if input new password is valid
  users[userIndex].password = form.newPassword.length > 0 ? form.newPassword : form.curPassword;
  users[userIndex].name = form.name;
  users[userIndex].email = form.email;
  users[userIndex].avatar = avatar;

  // update users array in local storage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // update authenticated user
  setAuthUser(users[userIndex]);

  // return the updated user profile
  error = false;
  response = getAuthUserProfile();
  return {error, response};
}

function deleteUser(authUser, password) {
  // check if the input password is matched with user password
  if (!verifyAuthPassword(password))
    return false;

  // delete all posts and replies created by this user
  deletePostsByUser(authUser.email);
  deleteRepliesByUser(authUser.email);

  const users = getUsers();
  const userIndex = getUserIndex(users, authUser);

  // remove user from users array
  users.splice(userIndex, 1); 
  
  // update users array in local storage
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // remove authenticated user
  removeAuthUser();
  return true;
}

function doesUserNameExists(name) {
  const users = getUsers();

  // iterate over the users and check if such name exists (case insensitive)
  for (const user of users) {
    if (name.toLowerCase() === user.name.toLowerCase()) {
      return true;
    }
  }
  return false;
}

export {
  authenticateUser,
  createUser,
  editUser,
  deleteUser,
  doesUserNameExists
}
