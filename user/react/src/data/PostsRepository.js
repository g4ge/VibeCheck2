/*
 * PostsRepository maintains all the posts created by the users
 */

import { getCurrentDate, getCurrentTime, getMsSinceEpoch } from "utils/Date";
import { createReplyGroup } from "./RepliesRepository";
import { uploadImage } from "utils/Upload";

const POSTS_KEY = "POSTS";

function getAllPosts() {
  // extract all posts from local storage
  const posts = localStorage.getItem(POSTS_KEY);

  // convert json strings to JS object if post exists
  if (posts) 
    return JSON.parse(posts);

  // return an empty array if no post exists
  return [];
}

function getPostsByUser(name) {
  const posts = getAllPosts();
  let userPosts = [];
  
  // extract posts filtered by user's name
  for (const post of posts) {
    if (name.toLowerCase() === post.authorName.toLowerCase()) {
      userPosts.push(post);
    }
  }
  return userPosts;
}

function getPostsByIds(ids) {
  const posts = getAllPosts();

  // convert id array to set
  const setIds = new Set(ids);
  let postsByIds = [];

  // extract posts filtered by post id
  for (const post of posts) {
    if (setIds.has(post.id)) {
      postsByIds.push(post);
    }
  }
  return postsByIds;
}

function getPostIdsByUser(name) {
  const posts = getAllPosts();
  let postIds = [];
  
  // extract posts IDs filtered by user's name
  for (const post of posts) {
    if (name.toLowerCase() === post.authorName.toLowerCase()) {
      postIds.push(post.id);
    }
  }
  return postIds;
}

async function createPost(authUser, content, image) {
  const posts = getAllPosts();
  const id = getMsSinceEpoch();
  const date = getCurrentDate();
  const time = getCurrentTime();
  const imageUrl = await uploadImage(image, id);

  // add new post
  posts.push({
    id: id,
    authorName: authUser.name,
    authorEmail: authUser.email,
    authorAvatar: authUser.avatar,
    date: date,
    time: time,
    isAuthorDeleted: false,
    isContentDeleted: false,
    isContentEdited: false,
    content: content,
    imageUrl: imageUrl
  });

  // store updated posts in local storage
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));

  // add a new reply group for this post
  createReplyGroup(id);
  return time;
}

function deletePostById(id) {
  const posts = getAllPosts();
  const date = getCurrentDate();
  const time = getCurrentTime();

  // iterate over the posts to get the chosen post
  for (const post of posts) {
    if (id === post.id) {
      // remove the content & update delete details
      post.isContentDeleted = true;
      post.content = " This post has been deleted on " + date + " at " + time + ".";
      post.imageUrl = ""; // remove image
      break;
    }  
  }

  // update posts in local storage
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function deletePostsByUser(userEmail) {
  const posts = getAllPosts();

  // update delete details of all the posts created by the deleted author
  for (const post of posts) {
    if (userEmail === post.authorEmail) {
      post.authorName = "";
      post.authorEmail = "";
      post.authorAvatar = "AvatarQuestion"; // avatar for deleted user
      post.isAuthorDeleted = true;
      post.isContentDeleted = true;
      post.content = " This post has been removed. The author does not exist anymore.";
      post.imageUrl = "";
    }  
  }

  // update posts in local storage
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function editPost(id, content) {
  const posts = getAllPosts();
  const time = getCurrentTime();

  // iterate over the posts to get the chosen post
  for (const post of posts) {
    if (id === post.id) {
      // update the post content
      post.isContentEdited = true;
      post.content = content
      break;
    }  
  }

  // update posts in local storage
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  return time;
}

function editPostAuthorInfo(currentEmail, newName, newEmail, newAvatar) {
  const posts = getAllPosts();

  // update author's name and email of all his/her posts
  for (const post of posts) {
    if (currentEmail === post.authorEmail) {
      post.authorName = newName;
      post.authorEmail = newEmail;
      post.authorAvatar = newAvatar;
    }  
  }
  
  // update posts in local storage
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function orderPostsByTime(posts) {
  // reorder the post based on post id (i.e. ms since epoch) from oldest to latest
  posts.sort((a, b) => a.id - b.id);
  return posts
}

export {
  getAllPosts,
  getPostsByUser,
  getPostsByIds,
  getPostIdsByUser,
  createPost,
  deletePostById,
  deletePostsByUser,
  editPost,
  editPostAuthorInfo,
  orderPostsByTime
}