import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import { editPost } from "data/PostRepository";
import { isEmptyString, validateMaxLength } from "utils/FormValidation";
import "App.css";

function PostEditForm({ isPost, id, currentContent, currentImageURL, refreshPosts, refreshReplies }) {
  const [content, setContent] = useState(currentContent);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const handleValidation = () => {
    // check if content only contain whitespaces
    if (isEmptyString(content) && currentImageURL.length === 0) {
      setError("Edited content cannot be empty");
      return false;
    }

    if (!validateMaxLength(content, 600)) {
      setError("Edited content length cannot be greater than 600");
      return false;
    }

    return true;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(""); // clear notification

    // stop editing post/reply if form input is invalid
    if (!handleValidation())
      return;

    // edit post/reply
    const post = await editPost(id, content);

    if (isPost) 
      refreshPosts();
    else
      refreshReplies();

    setError(""); // clear error
    setContent(""); // clear edit textarea
    setNotification("You just edited your " + (isPost ? "post" : "reply") + " on " + post.editedDate + "."); // show notification
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
            required={false}
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