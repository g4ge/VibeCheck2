import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { removePost } from "data/PostRepository";
import "App.css";

function PostDeleteForm({ isPost, id, refreshPosts, refreshReplies, sendButtonShown }) {
  const handleClick = async () => {
    // remove post/reply
    await removePost(id);

    if (isPost)
      refreshPosts();
    else
      refreshReplies();

    // hide delete button
    sendButtonShown(false);
  }

  return (
    <div className="mt-3">
      {/* delete post confirmation text */}
      <div className="form-error form-msg-sm">
        <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth />{" "}
        Are you sure you want to delete this {isPost ? "post" : "reply"}?
      </div>

      {/* delete post button */}
      <button type="button" className="custom-btn po-dlt-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faTrashAlt} size="xs" fixedWidth /> Delete
      </button>
    </div>
  );
}

export default PostDeleteForm;