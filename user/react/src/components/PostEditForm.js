import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { editPost } from "data/PostsRepository";
import { editReply } from "data/RepliesRepository";
import { isEmptyString } from "utils/FormValidation";
import "App.css";

function PostEditForm({ isPost, id, rootId, currentContent, refreshPosts, refreshReplies }) {
  const [content, setContent] = useState(currentContent);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(""); // clear notification

    // check if content only contain whitespaces
    if (isEmptyString(content)) {
      setError("Edited content cannot be empty");
      return;
    }

    let editedTime = "";

    if (isPost) {
      editedTime = editPost(id, content);
      refreshPosts();
    } else {
      editedTime = editReply(id, rootId, content);
      refreshReplies();
    }

    setError(""); // clear error
    setContent(""); // clear edit textarea
    setNotification("You just edited your " + (isPost ? "post" : "reply") + " on " + editedTime + "."); // show notification
  };

  return (
    <div className="mt-3">
      <form className="po-input-wrap" onSubmit={handleSubmit}>
        {/* input textarea */}
        <div className="po-input-body-wrap">
          <textarea
            className="po-input-body"
            placeholder={isPost ? "edit this post..." : "edit this reply..."}
            spellCheck={false}
            required={true}
            rows="1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {/* edit button */}
        <button type="submit" className="custom-btn po-btn">
            <FontAwesomeIcon icon={faEdit} size="xs" fixedWidth /> Edit
        </button>
      </form>
      

      {/* edit error */}
      {error && 
        <div className="mt-2 form-msg form-error form-msg-no-outline">
          <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
        </div>
      }

      {/* edit successful */}
      {notification && 
        <div className="mt-2 form-msg form-noti form-msg-no-outline">
          <FontAwesomeIcon icon={faCheckCircle} size="sm" fixedWidth /> {notification}
        </div>
      }
    </div>
  );
}

export default PostEditForm;