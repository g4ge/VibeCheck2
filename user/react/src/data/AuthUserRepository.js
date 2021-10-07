/*
 * Authenticated/logged in user is maintained using context.
 * However, the data is lost when the page is refreshed.
 * Hence, it is stored in local storage and maintained by AuthUserRepository
 * so that the context is able to retrieve the data when a page is refreshed.
 */

const AUTH_USER_KEY = "AUTH_USER";

function setAuthUser(user) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function getAuthUser() {
  return JSON.parse(localStorage.getItem(AUTH_USER_KEY));
}

function removeAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}

export {
  setAuthUser,
  getAuthUser,
  removeAuthUser
}

// /*
//  * Return authenticated user data without password
//  */
// function getAuthUserProfile() {
//   const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY));

//   if (authUser) {
//     const authUserWithoutPwd = {
//       name: authUser.name,
//       email: authUser.email,
//       joinedDate: authUser.joinedDate,
//       avatar: authUser.avatar
//     }
//     return authUserWithoutPwd;
//   }
//   return null;
// }


// function verifyAuthPassword(password) {
//   const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
//   return password === authUser.password;
// }

// export {
//   getAuthUser,
//   setAuthUser,
//   getAuthUserProfile,
//   removeAuthUser,
//   verifyAuthPassword
// }