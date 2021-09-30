import React, { useState } from "react";
import Header from "components/Header";
import NavBar from "components/NavBar";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AccountDeleteForm from "components/AccountDeleteForm";
import AccountEditForm from "components/AccountEditForm";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function Profile() {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div>
      <Header isSignedIn={true} type={"general"}/>
      
      <div className="content-wrap">
        <div className="content-container">
          <NavBar currentPage="profile"/>

          <div className="content">
            <div className="pf-wrap">
              <div className="row">
                {/* profile photo */}
                <div className="col-md-3 pf-avatar-wrap">
                  <img className="pf-avatar" src={avatars[authUser.avatar]} alt="Avatar"></img>
                </div>

                {/* profile info */}
                <div className="col-md-7 pf-info">
                  <p className="form-title" style={{fontSize: "24px", lineHeight: "34px"}}>{authUser.name}</p>
                  <p>{authUser.email}</p>
                  <p>Joined on {authUser.joinedDate}</p>
                </div>

                {/* profile edit and delete buttons */}
                <div className="col-md-2">
                  <button type="button" className="icon-btn pf-edit-btn" onClick={() => {setShowEdit(!showEdit); setShowDelete(false)}}>
                    <FontAwesomeIcon icon={faEdit} fixedWidth /> 
                  </button>
                  <button type="button" className="icon-btn pf-trash-btn" onClick={() => {setShowEdit(false); setShowDelete(!showDelete)}}>
                    <FontAwesomeIcon icon={faTrashAlt} fixedWidth /> 
                  </button>
                </div>
              </div>
              
              {/* display selected form */}
              {showEdit && <AccountEditForm />}
              {showDelete && <AccountDeleteForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;