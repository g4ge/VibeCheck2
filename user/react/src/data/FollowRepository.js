import axios from "axios";

const FOLLOW_API_URL = process.env.REACT_APP_API_URL + "/follow";


/*
 * Add a new followed user
 */ 
async function followUser(followerId, followingId) {
  const res = await axios.get(FOLLOW_API_URL + "/add", { params: { followerId, followingId } });
  return res.data;
}


/*
 * Remove a followed user
 */ 
async function unfollowUser(followerId, followingId) {
  const res = await axios.get(FOLLOW_API_URL + "/remove", { params: { followerId, followingId } });
  return res.data;
}


/*
 * Get all followed users
 */ 
async function getFollowedUsers(followerId) {
  const res = await axios.get(FOLLOW_API_URL + "/followed", { params: { followerId } });
  return res.data;
}


/*
 * Get all unfollowed users
 */ 
async function getUnfollowedUsers(followerId) {
  const res = await axios.get(FOLLOW_API_URL + "/unfollowed", { params: { followerId } });
  return res.data;
}


export {
  followUser,
  unfollowUser,
  getFollowedUsers,
  getUnfollowedUsers
}
