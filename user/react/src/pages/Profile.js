import React, { useState, useEffect, useCallback } from "react";
import Header from "components/Header";
import NavBar from "components/NavBar";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrashAlt, faEnvelope, faClock } from "@fortawesome/free-solid-svg-icons";
import AccountDeleteForm from "components/AccountDeleteForm";
import AccountEditForm from "components/AccountEditForm";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import { getUser } from "data/UserRepository";
import "App.css";

function Profile() {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();
  const [profile, setProfile] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const refreshProfile = useCallback(() => {
    // fetch user profile details from database via API
    const axiosGetUser = async () => {
      const user = await getUser(authUser.id);
      setProfile(user);
    }  
    axiosGetUser();
  }, [authUser.id])

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

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
                  <img className="pf-avatar" src={avatars[profile.avatar]} alt="Avatar"></img>
                </div>

                {/* profile info */}
                <div className="col-md-7 pf-info">
                  <p className="form-title" style={{fontSize: "20px", lineHeight: "30px"}}>{profile.name}</p>
                  <p className="pf-info-field"><FontAwesomeIcon icon={faUser} size="xs" fixedWidth /> &nbsp;{profile.username}</p>
                  <p className="pf-info-field"><FontAwesomeIcon icon={faEnvelope} size="xs" fixedWidth /> &nbsp;{profile.email}</p>
                  <p className="pf-info-field"><FontAwesomeIcon icon={faClock} size="xs" fixedWidth /> &nbsp;Joined on {profile.joinedDate}</p>
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
              {showEdit && <AccountEditForm profile={profile} refreshProfile={refreshProfile} />}
              {showDelete && <AccountDeleteForm profile={profile} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;