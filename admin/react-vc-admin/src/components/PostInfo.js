import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarQuestion from "images/avatars/question.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function PostInfo({ post, sendButtonShown }) {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarQuestion, AvatarUfo, AvatarUser };
  const [deletePost, setDeletePost] = useState(false);

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
              <Link className="username-link" to={`/user/${post.user.id}`}>
                {post.user.username}{" "}
              </Link>
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
      
      <div className="po-btns-wrap">
        {/* show buttons if post is not deleted & author is not deleted */}
        {!post.isAuthorDeleted && !post.isContentDeleted &&
          <Fragment>
            {/* delete button */}
            <button 
              type="button" 
              className="icon-btn po-icon-btn" 
              style={{float: "right"}}
              onClick={() => {
                setDeletePost(!deletePost);
                sendButtonShown(!deletePost);
              }}>
              <FontAwesomeIcon icon={faTrashAlt} className="po-icon" fixedWidth /> 
            </button> 
            
            {/* dislike button */}
            <div className="icon-btn po-icon-btn po-icon-btn-long po-dislike-btn">
              <FontAwesomeIcon icon={faThumbsDown} className="po-icon" fixedWidth />
              <span style={{fontSize: "10px"}}>&nbsp;{post.dislikeCount}</span>
            </div>

            {/* like button */}
            <div className="icon-btn po-icon-btn po-icon-btn-long po-like-btn">
              <FontAwesomeIcon icon={faThumbsUp} className="po-icon" fixedWidth />
              <span style={{fontSize: "10px"}}>&nbsp;{post.likeCount}</span>
            </div>
          </Fragment>
        }
      </div>
    </div>
  );
}

export default PostInfo;