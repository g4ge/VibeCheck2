/*
 * Authenticated/logged in user is maintained using context.
 * However, the data is lost when the page is refreshed.
 * Hence, it is stored in local storage (acts as the backend) and maintained by AuthUserRepository
 * so that the context is able to retrieve the data when a page is refreshed.
 */

const AUTH_USER_KEY = "AUTH_USER";

/*
 * Return authenticated user data without password
 */
function getAuthUserProfile() {
  const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY));

  if (authUser) {
    const authUserWithoutPwd = {
      name: authUser.name,
      email: authUser.email,
      joinedDate: authUser.joinedDate,
      avatar: authUser.avatar
    }
    return authUserWithoutPwd;
  }
  return null;
}

function setAuthUser(authUser) {
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser));
}

function removeAuthUser() {
  localStorage.removeItem(AUTH_USER_KEY);
}

function verifyAuthPassword(password) {
  const authUser = JSON.parse(localStorage.getItem(AUTH_USER_KEY));
  return password === authUser.password;
}

export {
  setAuthUser,
  getAuthUserProfile,
  removeAuthUser,
  verifyAuthPassword
}