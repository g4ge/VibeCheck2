import axios from "axios";
import { uploadImage } from "utils/Upload";
import { convertTimestampToTime, convertTimestampToDateTime } from "utils/Date";

const POST_API_URL = process.env.REACT_APP_API_URL + "/post";


/*
 * Create a new post (default is post, specify rootId and parentId if it is a reply)
 */ 
async function createPost(userId, content, image, rootId = 0, parentId = 0) {
  const body = {
    authorId: userId,
    rootId: rootId,
    parentId: parentId,
    content: content
  };

  // create a post without image
  const res = await axios.post(POST_API_URL + "/create", body);
  const post = res.data;
  post.postedDate = convertTimestampToTime(post.postedDate); // change time format

  // if image is supplied
  if (image) {
    // upload image to s3 bucket
    const filename = post.id.toString();
    const imageURL = await uploadImage(image, filename);

    // update imageURL of the post in database
    const id = post.id;
    await axios.get(POST_API_URL + "/image", { params: { id, imageURL } });
  }

  return post;
}


/*
 * Get all posts (root post only, i.e. post with rootId = 0)
 */ 
async function getAllPosts() {
  const res = await axios.get(POST_API_URL + "/all");
  const posts = res.data;

  for (let post of posts)
    post.postedDate = convertTimestampToDateTime(post.postedDate); // change date time format

  return posts;
}


/*
 * Get all replies to a root post
 */ 
async function getAllReplies(rootId) {
  const res = await axios.get(POST_API_URL + "/replies", { params: { rootId } });
  const replies = res.data;

  for (let reply of replies)
    reply.postedDate = convertTimestampToDateTime(reply.postedDate); // change date time format

  return replies;
}


/*
 * Edit a single post/reply
 */ 
async function editPost(id, content) {
  const body = {
    content: content
  }
  const res = await axios.post(POST_API_URL + "/edit", body, { params: { id } });
  const post = res.data;
  post.editedDate = convertTimestampToTime(post.editedDate); // change time format

  return post;
}


/*
 * Remove a single post/reply
 */ 
async function removePost(id) {
  const res = await axios.get(POST_API_URL + "/remove", { params: { id } });
  return res.data;
}


/*
 * Get all posts & replies of a user
 */ 
async function getAllUserPosts(authorId) {
  const res = await axios.get(POST_API_URL + "/user", { params: { authorId } });
  const posts = res.data;

  for (let post of posts)
    post.postedDate = convertTimestampToDateTime(post.postedDate); // change date time format

  return posts;
}

export {
  createPost,
  getAllPosts,
  getAllReplies,
  editPost,
  removePost,
  getAllUserPosts
}