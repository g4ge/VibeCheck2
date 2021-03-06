import React, { Fragment, useState } from "react";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faExclamationCircle, faCheckCircle, faComment, faImage, faTimesCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { createPost } from "data/PostRepository";
import { isEmptyString, validateMaxLength } from "utils/FormValidation";
import "App.css";

function PostCreateForm({ isNewPost, rootId, parentId, refreshPosts, refreshReplies }) {
  const { authUser } = useUserContext();
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    // check if content only contain whitespaces
    if (isEmptyString(content) && image === null) {
      setError((isNewPost ? "Post" : "Reply") + " cannot be empty. Add some text or upload an image.");
      return false;
    }

    if (!validateMaxLength(content, 600)) {
      setError("Content length cannot be greater than 600");
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(""); // clear notification
    setError(""); // clear error
    
    // stop creating post/reply if form input is invalid
    if (!handleValidation())
      return;
    
    let noti = "";
    setIsLoading(true); // start posting process

    if (isNewPost) {
      // create a new individual post
      const post = await createPost(authUser.id, content, image);
      noti = "You just shared a new post on " + post.postedDate + ".";

      // refresh all posts
      refreshPosts();
    } else {
      // create a new reply to its parent (post/another reply) 
      const reply = await createPost(authUser.id, content, image, rootId, parentId);
      noti = "You just replied on " + reply.postedDate + ".";

      // refresh all replies under this individual post
      refreshReplies(); 
    }
  
    setIsLoading(false); // finish posting process
    setImage(null); // clear input image
    setContent(""); // clear post textarea
    setNotification(noti); // show notification
  };

  return (
    <div className="mt-3">
      <form className="po-input-wrap" onSubmit={handleSubmit}>
        {/* input textarea */}
        <div className="po-input-body-wrap">
          <textarea
            className="po-input-body"
            placeholder={isNewPost ? "share your thoughts..." : "reply to the user above..."}
            spellCheck={false}
            required={false}
            rows="1"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        
        {/* post or reply button */}
        <button type="submit" className="custom-btn po-btn" disabled={isLoading}>
          {isNewPost 
            ? <Fragment><FontAwesomeIcon icon={faComment} size="xs" fixedWidth /> Post</Fragment>
            : <Fragment><FontAwesomeIcon icon={faReply} size="xs" fixedWidth /> Reply</Fragment>
          }
        </button>
      </form>

      {/* image file input field */}
      <div className="mt-2">
        <label className="img-input-wrap">
          <FontAwesomeIcon icon={faImage} size="sm" fixedWidth />{" "}
          {/* display file/image name if image is added by user */}
          {image
            ? <span>{image.name}</span> 
            : <span>Upload Image</span>}
          <input 
            type="file"  
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*" 
            style={{display: "none"}}
          />
        </label>

        {/* show remove image button if image is added by user */}
        {image &&
          <button 
            type="button" 
            className="icon-btn cancel-btn"
            onClick={() => setImage(null)}
          >
            <FontAwesomeIcon icon={faTimesCircle} fixedWidth />
          </button>
        }
      </div>  

      {/* display loading process of posting */}
      {isLoading && 
        <div className="mt-3 form-msg form-noti form-msg-no-outline">
          <FontAwesomeIcon icon={faCircleNotch} size="xs" spin fixedWidth />{" "}
          {isNewPost 
            ? <Fragment>Posting...</Fragment>
            : <Fragment>Replying...</Fragment>
          }
        </div>
      }

      {/* post or reply error */}
      {error && 
        <div className="mt-3 form-msg form-error form-msg-no-outline">
          <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
        </div>
      }

      {/* post or reply successful */}
      {notification && 
        <div className="mt-3 form-msg form-noti form-msg-no-outline">
          <FontAwesomeIcon icon={faCheckCircle} size="sm" fixedWidth /> {notification}
        </div>
      }
    </div>
  );
}

export default PostCreateForm;