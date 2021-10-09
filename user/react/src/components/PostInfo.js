import React, { useState, Fragment } from "react";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply, faUser, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarQuestion from "images/avatars/question.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function PostInfo({ post, sendButtonShown, showButtons = true }) {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarQuestion, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();
  const [button, setButton] = useState({
    isDelete: false,
    isEdit: false,
    isReply: false
  });

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
              {post.user.name}{" "}
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
      
      {/* post's delete, edit & reply buttons */}
      <div className="po-btns-wrap">
        {/* show all buttons if this post/reply has included other users */}
        {showButtons && 
          <Fragment>
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
                  <FontAwesomeIcon icon={faTrashAlt} size="xs" fixedWidth /> 
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
                  <FontAwesomeIcon icon={faEdit} size="xs" fixedWidth /> 
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
                <FontAwesomeIcon icon={faReply} size="xs" fixedWidth /> 
            </button>
          </Fragment>
        }
      </div>
    </div>
  );
}

export default PostInfo;