import React, { useState } from "react";
import PostCreateForm from "components/PostCreateForm";
import PostDeleteForm from "components/PostDeleteForm";
import PostEditForm from "./PostEditForm";
import PostInfo from "components/PostInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function SingleReply({ allReplies, rootId, reply, refreshReplies}) {
  const [button, setButton] = useState({
    isDelete: false,
    isEdit: false,
    isReply: false,
  });


  // extract child replies of this reply
  const childReplies = allReplies.filter((r) => r.parentId === reply.id);


  // send form shown from child to parent
  const sendButtonShown = (button) => {
    setButton({
      isDelete: button.isDelete,
      isEdit: button.isEdit,
      isReply: button.isReply
    });
  };


  // display different type of icon based on how a post is deleted (deleted by user/user is deleted)
  let replyDeletedIcon;
  if (reply.isAuthorDeleted) {
    replyDeletedIcon = <FontAwesomeIcon icon={faUserSlash} size="sm" fixedWidth />
  } else if (reply.isContentDeleted) {
    replyDeletedIcon = <FontAwesomeIcon icon={faGhost} size="sm" fixedWidth />
  }
    
  return (
    <div>
      <PostInfo post={reply} sendButtonShown={sendButtonShown} />

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

      {/* create reply to current reply */}
      {button.isReply && 
        <PostCreateForm
          isNewPost={false} 
          rootId={rootId} 
          parentId={reply.id} 
          refreshReplies={refreshReplies} 
        />
      }

      {/* delete current reply */}
      {button.isDelete && 
        <PostDeleteForm 
          isPost={false}
          id={reply.id}
          refreshReplies={refreshReplies}
          sendButtonShown={sendButtonShown}
        />
      }

      {/* edit current reply */}
      {button.isEdit && 
        <PostEditForm 
          isPost={false}
          id={reply.id}
          currentContent={reply.content}
          currentImageURL={reply.imageURL}
          refreshReplies={refreshReplies} 
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