/*
 * Each individual post has an array of replies (ReplyGroup) 
 * and all groups and replies are maintained by RepliesRepository.
 */

import { getCurrentDate, getCurrentTime, getMsSinceEpoch } from "utils/Date";
import { uploadImage } from "utils/Upload";

const REPLIES_KEY = "REPLIES";

function getAllReplyGroups() {
  // extract all groups/arrays of replies from local storage
  const replyGroups = localStorage.getItem(REPLIES_KEY);
  
  // convert json strings to JS object if group exists
  if (replyGroups)
    return JSON.parse(replyGroups)

  // return an empty dictionary if no group exists
  return {};
}

function createReplyGroup(rootId) {
  const allReplyGroups = getAllReplyGroups();

  // initialise an empty array which will be storing replies later
  allReplyGroups[rootId] = [];

  // store updated reply groups in local storage
  localStorage.setItem(REPLIES_KEY, JSON.stringify(allReplyGroups));
}

async function createReply(authUser, rootId, parentId, content, image) {
  const allReplyGroups = getAllReplyGroups();
  const id = getMsSinceEpoch();
  const date = getCurrentDate();
  const time = getCurrentTime();
  const imageUrl = await uploadImage(image, id);

  // add new reply to the reply group
  allReplyGroups[rootId].push({
    id: id,
    parentId: parentId, 
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

  // store updated reply groups in local storage
  localStorage.setItem(REPLIES_KEY, JSON.stringify(allReplyGroups));
  return time;
}

function deleteReplyById(id, rootId) {
  const replies = getReplies(rootId);
  const date = getCurrentDate();
  const time = getCurrentTime();

  // iterate over the replies to get the chosen reply
  for (const reply of replies) {
    if (id === reply.id) {
      // remove the content & update delete details
      reply.isContentDeleted = true;
      reply.content = " This reply has been deleted on " + date + " at " + time + ".";
      reply.imageUrl = ""; // remove image
      break;
    }
  }
  
  // update replies under the individual post
  const allReplyGroups = getAllReplyGroups();
  allReplyGroups[rootId] = replies;

  // update replies of all posts in local storage
  localStorage.setItem(REPLIES_KEY, JSON.stringify(allReplyGroups));
}

function deleteRepliesByUser(userEmail) {
  const allReplyGroups = getAllReplyGroups();
  
  // iterate over all the root posts
  for (const rootPostId in allReplyGroups) {
    // update delete details of all the replies created by the deleted author
    for (const reply of allReplyGroups[rootPostId]) {
      if (userEmail === reply.authorEmail) {
        reply.authorName = "";
        reply.authorEmail = "";
        reply.authorAvatar = "AvatarQuestion"; // avatar for deleted user
        reply.isAuthorDeleted = true;
        reply.isContentDeleted = true;
        reply.content = " This reply has been removed. The author does not exist anymore.";
        reply.imageUrl = "";
      }
    }
  }

  // update replies of all posts in local storage
  localStorage.setItem(REPLIES_KEY, JSON.stringify(allReplyGroups));
}

function editReply(id, rootId, content) {
  const replies = getReplies(rootId);
  const time = getCurrentTime();

  // iterate over the replies to get the chosen reply
  for (const reply of replies) {
    if (id === reply.id) {
      // update the reply content
      reply.isContentEdited = true;
      reply.content = content;
      break;
    }
  }
  
  // update replies under the individual post
  const allReplyGroups = getAllReplyGroups();
  allReplyGroups[rootId] = replies;

  // update replies of all posts in local storage
  localStorage.setItem(REPLIES_KEY, JSON.stringify(allReplyGroups));
  return time;
}

function editReplyAuthorInfo(currentEmail, newName, newEmail, newAvatar) {
  const allReplyGroups = getAllReplyGroups();
  
  // iterate over all the root posts
  for (const rootPostId in allReplyGroups) {
    // update author's name and email of all his/her replies
    for (const reply of allReplyGroups[rootPostId]) {
      if (currentEmail === reply.authorEmail) {
        reply.authorName = newName;
        reply.authorEmail = newEmail;
        reply.authorAvatar = newAvatar;
      }
    }
  }

  // update replies of all posts in local storage
  localStorage.setItem(REPLIES_KEY, JSON.stringify(allReplyGroups));
}

function getReplies(rootId) {
  const allReplyGroups = getAllReplyGroups();

  // retrieve all replies of an individual post
  return allReplyGroups[rootId];
}

function getRepliesByUser(name) {
  const allReplyGroups = getAllReplyGroups();

  let userReplies = [];

  // iterate over all the root posts
  for (const rootPostId in allReplyGroups) { 
    // extract replies filtered by user's name
    for (const reply of allReplyGroups[rootPostId]) {
      if (name.toLowerCase() === reply.authorName.toLowerCase()) {
        userReplies.push(reply);
      }
    }
  }
  return userReplies;
}

function getRootPostIdsByUser(name) {
  const allReplyGroups = getAllReplyGroups();

  let rootPostIds = [];

  // iterate over all the root posts
  for (const rootPostId in allReplyGroups) { 
    // extract root post's id if this root post contains reply made by user with such name
    for (const reply of allReplyGroups[rootPostId]) {
      if (name.toLowerCase() === reply.authorName.toLowerCase()) {
        rootPostIds.push(rootPostId);
        break;
      }
    }
  }
  return rootPostIds;
}

export {
  createReplyGroup,
  createReply,
  deleteReplyById,
  deleteRepliesByUser,
  editReply,
  editReplyAuthorInfo,
  getReplies,
  getRepliesByUser,
  getRootPostIdsByUser
}