import React, { useState, useEffect } from "react";
import PostDeleteForm from "components/PostDeleteForm";
import PostInfo from "components/PostInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { checkProfanity } from "utils/ProfanityFilter";
import "App.css";

function SingleReply({ allReplies, rootId, reply, refreshReplies, enableDelete = true }) {
  const [deletePost, setDeletePost] = useState(false);
  const [hasProfanity, setHasProfanity] = useState(false);

  // extract child replies of this reply
  const childReplies = allReplies.filter((r) => r.parentId === reply.id);

  // send delete form shown from child to parent
  const sendButtonShown = (showdeletePost) => {
    setDeletePost(showdeletePost);
  };

  useEffect(() => {
    // profanity filter
    if (checkProfanity(reply.content)) {
      setDeletePost(true);
      setHasProfanity(true);
    }
  }, [reply.content]);


  // display different type of icon based on how a post is deleted (deleted by user/user is deleted)
  let replyDeletedIcon;
  if (reply.isAuthorDeleted) {
    replyDeletedIcon = <FontAwesomeIcon icon={faUserSlash} size="sm" fixedWidth />
  } else if (reply.isContentDeleted) {
    replyDeletedIcon = <FontAwesomeIcon icon={faGhost} size="sm" fixedWidth />
  }
    
  return (
    <div>
      <PostInfo post={reply} sendButtonShown={sendButtonShown} enableDelete={enableDelete} hasProfanity={hasProfanity} />

      {/* reply's text */}
      <div className={`reply-text ${reply.isContentDeleted && "reply-dlted-text"}`}>
        {replyDeletedIcon}{reply.content}
      </div>

      {/* reply's image */}
      {reply.imageURL.length > 0 &&
        <div className="po-image-wrap mt-4 mb-4">
          <img className="po-image" src={reply.imageURL} alt="Post"></img>
        </div>
      }

      {/* delete current reply */}
      {deletePost && 
        <PostDeleteForm 
          isPost={false}
          id={reply.id}
          refreshReplies={refreshReplies}
          sendButtonShown={sendButtonShown}
          hasProfanity={hasProfanity}
        />
      }

      {/* replies to current reply */}
      {childReplies.length > 0 &&
        <div>  
          {childReplies.map(reply =>
            <div key={reply.id} className="reply-wrap mt-4">
              <SingleReply 
                allReplies={allReplies} 
                rootId={rootId} 
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

export default SingleReply;