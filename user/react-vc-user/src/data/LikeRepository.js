import axios from "axios";

const LIKE_API_URL = process.env.REACT_APP_API_URL + "/like";


/*
 * Add a like to a post
 */ 
async function addLike(userId, postId) {
  const res = await axios.get(LIKE_API_URL + "/add", { params: { userId, postId } });
  return res.data;
}


/*
 * Remove a like from a post
 */ 
async function removeLike(userId, postId) {
  const res = await axios.get(LIKE_API_URL + "/remove", { params: { userId, postId } });
  return res.data;
}


/*
 * Check if a user has liked the post
 */ 
async function hasUserLiked(userId, postId) {
  const res = await axios.get(LIKE_API_URL + "/status", { params: { userId, postId } });
  return res.data;
}

export {
  addLike,
  removeLike,
  hasUserLiked
}
