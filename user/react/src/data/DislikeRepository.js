import axios from "axios";

const DISLIKE_API_URL = process.env.REACT_APP_API_URL + "/dislike";


/*
 * Add a dislike to a post
 */ 
async function addDislike(userId, postId) {
  const res = await axios.get(DISLIKE_API_URL + "/add", { params: { userId, postId } });
  return res.data;
}


/*
 * Remove a dislike from a post
 */ 
async function removeDislike(userId, postId) {
  const res = await axios.get(DISLIKE_API_URL + "/remove", { params: { userId, postId } });
  return res.data;
}


/*
 * Check if a user has disliked the post
 */ 
async function hasUserDisliked(userId, postId) {
  const res = await axios.get(DISLIKE_API_URL + "/status", { params: { userId, postId } });
  return res.data;
}

export {
  addDislike,
  removeDislike,
  hasUserDisliked
}
