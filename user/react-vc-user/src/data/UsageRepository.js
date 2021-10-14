import axios from "axios";

const USAGE_API_URL = process.env.REACT_APP_API_URL + "/usage";


/*
 * Update user's day usage upon login
 */
async function updateUsageUponLogin(userId) {
  const res = await axios.get(USAGE_API_URL + "/updateStart", { params: { userId } });
  return res.data;
}


/*
 * Update user's day usage upon logout
 */
async function updateUsageUponLogout(userId) {
  const res = await axios.get(USAGE_API_URL + "/updateEnd", { params: { userId } });
  return res.data;
}


export {
  updateUsageUponLogin,
  updateUsageUponLogout
}
