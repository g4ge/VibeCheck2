import React, { useState, useEffect, useCallback } from "react";
import { getAllReplies } from "data/PostRepository";
import SingleReply from "./SingleReply";
import PostCreateForm from "components/PostCreateForm";
import PostDeleteForm from "components/PostDeleteForm";
import PostEditForm from "components/PostEditForm";
import PostInfo from "components/PostInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function SinglePost({ post, refreshPosts, includeOtherUsers = true }) {
  const [allReplies, setAllReplies] = useState([]);
  const [childReplies, setChildReplies] = useState([]);
  const [button, setButton] = useState({
    isDelete: false,
    isEdit: false,
    isReply: false
  });


  // send form shown from child to parent
  const sendButtonShown = (button) => {
    setButton({
      isDelete: button.isDelete,
      isEdit: button.isEdit,
      isReply: button.isReply
    });
  };


  const refreshReplies = useCallback(() => {
    const axiosGetReplies = async () => {
      // retrieve all replies to this post (i.e. root post)
      const rootPostAllReplies = await getAllReplies(post.id);
      setAllReplies(rootPostAllReplies);

      // extract child replies of this post
      const rootPostChildReplies = rootPostAllReplies.filter((r) => r.parentId === post.id)
      console.log(post.id, rootPostChildReplies)
      setChildReplies(rootPostChildReplies);
    }  
    axiosGetReplies();
  }, [post.id])


  useEffect(() => {
    // only retrieve replies if this post is set to include other users (i.e. other replies since this is the root post)
    if (includeOtherUsers)
      refreshReplies();
    else
      setChildReplies([]);
  }, [refreshReplies, includeOtherUsers]);

  
  // display different type of icon based on how a post is deleted (deleted by user/user is deleted)
  let postDeletedIcon;
  if (post.isAuthorDeleted) {
    postDeletedIcon = <FontAwesomeIcon icon={faUserSlash} size="sm" fixedWidth />
  } else if (post.isContentDeleted) {
    postDeletedIcon = <FontAwesomeIcon icon={faGhost} size="sm" fixedWidth />
  }

  return (
    <div>
      <PostInfo post={post} sendButtonShown={sendButtonShown} showButtons={includeOtherUsers} />

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

      {/* create top level reply (reply to current post) */}
      {button.isReply && 
        <PostCreateForm 
          isNewPost={false} 
          rootId={post.id} 
          parentId={post.id} 
          refreshReplies={refreshReplies} 
        />
      }

      {/* delete current post */}
      {button.isDelete && 
        <PostDeleteForm 
          isPost={true}
          id={post.id} 
          refreshPosts={refreshPosts} 
          sendButtonShown={sendButtonShown}
        />
      }

      {/* edit current post */}
      {button.isEdit && 
        <PostEditForm 
          isPost={true}
          id={post.id} 
          currentContent={post.content}
          refreshPosts={refreshPosts}
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