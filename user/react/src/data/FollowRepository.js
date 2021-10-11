import axios from "axios";

const FOLLOW_API_URL = process.env.REACT_APP_API_URL + "/follow";


/*
 * Add a new following user
 */ 
async function followUser(followerId, followingId) {
  const res = await axios.get(FOLLOW_API_URL + "/add", { params: { followerId, followingId } });
  return res.data;
}


/*
 * Remove a following user
 */ 
async function unfollowUser(followerId, followingId) {
  const res = await axios.get(FOLLOW_API_URL + "/remove", { params: { followerId, followingId } });
  return res.data;
}


export {
  followUser,
  unfollowUser
}
