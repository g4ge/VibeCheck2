import React, { useState, useEffect, useCallback } from "react";
import { getAllReplies } from "data/PostRepository";
import SingleReply from "./SingleReply";
import PostDeleteForm from "components/PostDeleteForm";
import PostInfo from "components/PostInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function SinglePost({ post, refreshPosts }) {
  const [allReplies, setAllReplies] = useState([]);
  const [childReplies, setChildReplies] = useState([]);
  const [deletePost, setDeletePost] = useState(false);

  // send delete form shown from child to parent
  const sendButtonShown = (showdeletePost) => {
    setDeletePost(showdeletePost);
  };


  const refreshReplies = useCallback(() => {
    const loadData = async () => {
      // retrieve all replies to this post (i.e. root post)
      const rootPostAllReplies = await getAllReplies(post.id);
      setAllReplies(rootPostAllReplies);

      // extract child replies of this post
      const rootPostChildReplies = rootPostAllReplies.filter((r) => r.parentId === post.id)
      setChildReplies(rootPostChildReplies);
    }  
    loadData();
  }, [post.id])


  useEffect(() => {
    refreshReplies();
  }, [refreshReplies]);

  
  // display different type of icon based on how a post is deleted (deleted by user/user is deleted)
  let postDeletedIcon;
  if (post.isAuthorDeleted) {
    postDeletedIcon = <FontAwesomeIcon icon={faUserSlash} size="sm" fixedWidth />
  } else if (post.isContentDeleted) {
    postDeletedIcon = <FontAwesomeIcon icon={faGhost} size="sm" fixedWidth />
  }

  return (
    <div>
      <PostInfo post={post} sendButtonShown={sendButtonShown} />

      {/* post's text */}
      <div className={`po-text ${post.isContentDeleted && "po-dlted-text"}`}>
        {postDeletedIcon}{post.content}
      </div>

      {/* post's image */}
      {post.imageURL.length > 0 &&
        <div className="po-image-wrap mt-4 mb-4">
          <img className="po-image" src={post.imageURL} alt="Post"></img>
        </div>
      }

      {/* delete current post */}
      {deletePost && 
        <PostDeleteForm 
          isPost={true}
          id={post.id} 
          refreshPosts={refreshPosts} 
          sendButtonShown={sendButtonShown}
        />
      }

      {/* replies to current post */}
      {childReplies.length > 0 &&
        <div>  
          {childReplies.map(reply =>
            <div key={reply.id} className="reply-wrap mt-4">
              <SingleReply 
                allReplies={allReplies} 
                rootId={post.id} 
                reply={reply} 
                refreshReplies={refreshReplies} 
              />
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default SinglePost;