import React, { useState, Fragment, useEffect } from "react";
import { useUserContext } from "libs/Context";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faUser, faEdit, faTrashAlt, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarQuestion from "images/avatars/question.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import { addLike, removeLike, hasUserLiked } from "data/LikeRepository";
import { addDislike, hasUserDisliked, removeDislike } from "data/DislikeRepository";
import "App.css";

function PostInfo({ post, sendButtonShown, showButtons = true }) {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarQuestion, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [button, setButton] = useState({
    isDelete: false,
    isEdit: false,
    isReply: false
  });


  const handleLike = async () => {
    // add or remove a like on a post
    if (hasLiked)
      await removeLike(authUser.id, post.id);
    else 
      await addLike(authUser.id, post.id);

    // update like & dislike buttons status
    setHasLiked(!hasLiked);
    setHasDisliked(false);
  }


  const handleDislike = async () => {
    // add or remove a dislike on a post
    if (hasDisliked)
      await removeDislike(authUser.id, post.id);
    else 
      await addDislike(authUser.id, post.id);

    // update like & dislike buttons status
    setHasDisliked(!hasDisliked);
    setHasLiked(false);
  }


  useEffect(() => {
    // check if current logged in user has liked an the post
    const axiosGetLikeDislikeStatus = async () => {
      const liked = await hasUserLiked(authUser.id, post.id);
      const disliked = await hasUserDisliked(authUser.id, post.id);
      setHasLiked(liked);
      setHasDisliked(disliked);
    }  
    axiosGetLikeDislikeStatus();
  }, [authUser.id, post.id]);

  return (
    <div className="po-info-wrap mb-3">
      {/* post's author profile photo */}
      <div className="po-avatar-wrap">
        <img className="po-avatar" src={avatars[post.user.avatar]} alt="Avatar"></img>
      </div>

      {/* post's author name & date */}
      <div className="po-name-date-wrap">
        {post.isAuthorDeleted ? (
          <p className="po-name po-dlted-text">--</p>
        ) : (
          <Fragment>
            <p className="po-name">
              <Link className="username-link" to={`/profile/${post.user.id}`}>
                {post.user.username}{" "}
              </Link>
              {/* show icon if this is the current user */}
              {authUser.id === post.user.id &&
                <FontAwesomeIcon icon={faUser} className="po-info-icon" fixedWidth />
              }
            </p>
            <p className="po-date">
              {post.postedDate} 
              {/* show edit icon if this post/reply has been edited */}
              {post.isContentEdited &&
                <Fragment>{" "}| <FontAwesomeIcon icon={faEdit} className="po-info-icon" fixedWidth /></Fragment>
              }
            </p>
          </Fragment>
        )}
      </div>
      
      {/* post's like, dislike, delete, edit & reply buttons */}
      <div className="po-btns-wrap">
        {/* show all buttons if this post/reply has included other users */}
        {showButtons && 
          <Fragment>
            {/* show like & dislike buttons if (1) post is not deleted, (2) author is not deleted */}
            {!post.isAuthorDeleted && !post.isContentDeleted &&
              <Fragment>
                <button type="button" className={`icon-btn po-icon-btn po-icon-btn-long ${hasDisliked && "po-dislike-btn"}`} onClick={handleDislike}>
                  <FontAwesomeIcon icon={faThumbsDown} className="po-icon" fixedWidth />
                  <span style={{fontSize: "10px"}}>&nbsp;{post.dislikeCount}</span>
                </button>

                <button type="button" className={`icon-btn po-icon-btn po-icon-btn-long ${hasLiked && "po-like-btn"}`} onClick={handleLike}>
                  <FontAwesomeIcon icon={faThumbsUp} className="po-icon" fixedWidth />
                  <span style={{fontSize: "10px"}}>&nbsp;{post.likeCount}</span>
                </button>
              </Fragment>
            }
  
            {/* show delete & edit buttons if (1) this is the current user, (2) post is not deleted, (3) author is not deleted */}
            {authUser.id === post.user.id && !post.isAuthorDeleted && !post.isContentDeleted &&
              <Fragment>
                <button 
                  type="button" 
                  className="icon-btn po-icon-btn" 
                  onClick={() => {
                    const newButton = {
                      isDelete: !button.isDelete,
                      isEdit: false,
                      isReply: false
                    };
                    setButton(newButton);
                    sendButtonShown(newButton);
                  }}>
                  <FontAwesomeIcon icon={faTrashAlt} className="po-icon" fixedWidth /> 
                </button> 

                <button 
                  type="button" 
                  className="icon-btn po-icon-btn" 
                  onClick={() => {
                    const newButton = {
                      isDelete: false,
                      isEdit: !button.isEdit,
                      isReply: false
                    };
                    setButton(newButton);
                    sendButtonShown(newButton);
                  }}>
                  <FontAwesomeIcon icon={faEdit} className="po-icon" fixedWidth /> 
                </button>
              </Fragment>
            }

            <button 
              type="button" 
              className="icon-btn po-icon-btn" 
              style={{float: "right"}}
              onClick={() => {
                const newButton = {
                  isDelete: false,
                  isEdit: false,
                  isReply: !button.isReply
                };
                setButton(newButton);
                sendButtonShown(newButton);
              }}>
                <FontAwesomeIcon icon={faReply} className="po-icon" fixedWidth /> 
            </button>
          </Fragment>
        }
      </div>
    </div>
  );
}

export default PostInfo;