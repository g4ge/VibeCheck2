import axios from "axios";
import { setAuthUser } from "./AuthUserRepository";
import { convertTimestampToDate } from "utils/Date";

const USER_API_URL = process.env.REACT_APP_API_URL + "/user";

async function createUser(user) {
  const res = await axios.post(USER_API_URL + "/create", user);
  return res.data;
}

async function loginUser(username, password) {
  const res = await axios.get(USER_API_URL + "/login", { params: { username, password } });
  const user = res.data;
  
  if (user) {
    user.joinedDate = convertTimestampToDate(user.joinedDate) // change date format
    setAuthUser(user);
  }

  return user;
}

async function editUser(id, user, avatar) {
  // add avatar attr into part of user form
  user.avatar = avatar;
  
  const res = await axios.post(USER_API_URL + "/edit", user, { params: { id } });
  const editedUser = res.data;

  // user is returned without error
  if (editedUser.id) {
    editedUser.joinedDate = convertTimestampToDate(editedUser.joinedDate) // change date format
    setAuthUser(editedUser);
  }

  return editedUser;
}


// async function findUser(id) {
//   const res = await axios.get(REACT_APP_API_URL + `/user/select/${id}`);

//   return res.data;
// }

export {
  createUser,
  loginUser,
  editUser
}
