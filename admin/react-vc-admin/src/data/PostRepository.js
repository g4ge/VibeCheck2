import { request, gql } from "graphql-request";
import { convertTimestampToDateTime } from "utils/Date";

const GRAPH_QL_URL = "http://localhost:8001/graphql";


/*
 * Get all posts (root post only, i.e. post with rootId = 0)
 */
async function getAllPosts() {
  const query = gql`
    {
      all_posts {
        id,
        rootId,
        parentId,
        content,
        imageURL,
        isContentEdited,
        isContentDeleted,
        isAuthorDeleted,
        likeCount,
        dislikeCount,
        postedDate,
        editedDate,
        authorId,
        user {
          id,
          username,
          avatar
        }
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  const posts = data.all_posts;
  
  for (let post of posts)
    post.postedDate = convertTimestampToDateTime(post.postedDate); // change date time format

  return posts;
}


/*
 * Get all replies to a root post
 */
async function getAllReplies(rootId) {
  const query = gql`
    query ($rootId: Int) {
      all_replies(rootId: $rootId) {
        id,
        rootId,
        parentId,
        content,
        imageURL,
        isContentEdited,
        isContentDeleted,
        isAuthorDeleted,
        likeCount,
        dislikeCount,
        postedDate,
        editedDate,
        authorId,
        user {
          id,
          username,
          avatar
        }
      }
    }
  `;

  const variables = { rootId };
  const data = await request(GRAPH_QL_URL, query, variables);
  const replies = data.all_replies;
  
  for (let reply of replies)
    reply.postedDate = convertTimestampToDateTime(reply.postedDate); // change date time format

  return replies;
}


export {
  getAllPosts,
  getAllReplies
}
