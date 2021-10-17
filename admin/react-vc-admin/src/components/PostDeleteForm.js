import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { removePost } from "data/PostRepository";
import "App.css";

function PostDeleteForm({ isPost, id, refreshPosts, refreshReplies, sendButtonShown, hasProfanity = false }) {
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
        {hasProfanity ? (
          <Fragment>
            Inappropriate {isPost ? "post" : "reply"}! Do you want to delete this?
          </Fragment>
        ) : (
          <Fragment>
            Are you sure you want to delete this {isPost ? "post" : "reply"}?
          </Fragment>
        )}        
      </div>

      {/* delete post button */}
      <button type="button" className="custom-btn po-dlt-btn" onClick={handleClick}>
        <FontAwesomeIcon icon={faTrashAlt} size="xs" fixedWidth /> Delete
      </button>
    </div>
  );
}

export default PostDeleteForm;