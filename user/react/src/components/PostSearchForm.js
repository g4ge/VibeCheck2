import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle, faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { isEmptyString } from "utils/FormValidation";
import { getPostIdsByUser, getPostsByUser } from "data/PostsRepository";
import { getRepliesByUser, getRootPostIdsByUser } from "data/RepliesRepository";
import { doesUserNameExists } from "data/UsersRepository";
import "App.css";

function PostSearchForm({ refreshPosts }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");
  const [hasOtherUsers, setHasOtherUsers] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setNotification(""); // clear notification

    // check if name only contain whitespaces
    if (isEmptyString(name)) {
      setError("Name cannot be empty.");
      return;
    }

    // check if user with such name exists (case insensitive)
    if (!doesUserNameExists(name)) {
      setError("User not found. Please try again with another name.");
      return;
    }

    let noti = "";

    if (hasOtherUsers) {
      const postIds = getPostIdsByUser(name); // get ID of relevant posts
      const rootPostIds = getRootPostIdsByUser(name); // get ID of the root posts that contains relevant replies
      const allPostsIds = postIds.concat(rootPostIds);
      const setAllPostsIds = new Set(allPostsIds); // convert to set to remove duplicated post IDs

      if (allPostsIds.length > 0) {
        // refresh posts by providing retrieved posts IDs to parent component
        refreshPosts(null, hasOtherUsers, allPostsIds);  
        noti = setAllPostsIds.size + " posts including posts/replies by " + name + " have been found.";
      } else {
        setError("No posts/replies made by " + name + ".");
        return;
      }
    } else {
      const userPosts = getPostsByUser(name); // retrieve relevant posts
      const userReplies = getRepliesByUser(name); // retrieve relevant replies as separate posts
      const userPostsAndReplies = userPosts.concat(userReplies);

      if (userPostsAndReplies.length > 0) {
        // refresh posts by providing retrieved posts to parent component
        refreshPosts(userPostsAndReplies, hasOtherUsers, []);  
        noti = userPostsAndReplies.length + " posts/replies by " + name  + " have been found.";
      } else {
        setError("No posts/replies made by " + name + ".");
        return;
      }
    }
    
    setError(""); // clear error
    setName(""); // clear post textarea
    setNotification(noti); // show notification
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* input name field */}
          <div className="col-md-6 mb-3">
            <input
              className="po-input-body"
              placeholder={"enter author's name..."}
              spellCheck={false}
              required={true}
              value={name}
              style={{width: "100%"}}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* search button */}
          <div className="col-md-6 mb-3">
            <button type="submit" className="custom-btn po-btn" style={{width: "150px"}}>
              <FontAwesomeIcon icon={faSearch} size="xs" fixedWidth /> Search posts
            </button>
          </div>
        </div>
      </form>
      
      {/* checkbox for search options (include others users in the same posts/replies) */}
      <div className="form-check form-switch">
        <label className="form-check-label reply-text">
          Include posts/replies by other users in the same post        
          <input 
            className="form-check-input" 
            type="checkbox" 
            onChange={() => setHasOtherUsers(!hasOtherUsers)}
            checked={hasOtherUsers} />
        </label>
      </div>

      {/* search error */}
      {error && 
        <div className="mt-3 form-msg form-error form-msg-no-outline">
          <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> {error}
        </div>
      }

      {/* search successful notification */}
      {notification && 
        <div className="mt-3 form-msg form-noti form-msg-no-outline">
          <FontAwesomeIcon icon={faCheckCircle} size="sm" fixedWidth /> {notification}
        </div>
      }
    </div>
  );
}

export default PostSearchForm;