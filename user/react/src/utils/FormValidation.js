/*
 *  Valid password must contain all of the following:
 *  1. at least 6 characters
 *  2. lowercase
 *  3. uppercase
 *  4. number
 *  5. punctuation
 */
function validatePassword(password) {
  const validPassword = /^(?=.{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).*$/;
  return validPassword.test(password);
}

function validateEmail(email) {
  const validEmail = /\S+@\S+\.\S+/;
  return validEmail.test(email);
}

function isEmptyString(str) {
  // remove whitespace, return true if the string only contains whitespace
  return !str.trim();
}

export {
  validatePassword,
  validateEmail,
  isEmptyString
} 