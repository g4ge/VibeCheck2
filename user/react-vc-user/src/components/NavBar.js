
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "libs/Context";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function NavBar({ currentPage, profileId }) {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();

  return (
    <div>
      <div className="nav-sidebar">

        {/* user profile photo and name */}
        <div className="nav-info-wrap">
          <img className="nav-avatar" src={avatars[authUser.avatar]} alt="Avatar"></img>
          <div className="mt-3" style={{fontWeight: "500"}}>{authUser.username}</div>
          <div className="mt-1" style={{fontSize: "12px", opacity: "0.7"}}>{authUser.name}</div>
        </div>

        {/* app navigation links */}
        <div className="mt-5">
          <Link className={`nav-sidebar-list ${currentPage === "profile" && parseInt(profileId) === authUser.id ? "nav-sidebar-current" : ""}`} to={`/profile/${authUser.id}`}>
            <FontAwesomeIcon icon={faUser} size="sm" fixedWidth /> Profile
          </Link>
          <Link className={`nav-sidebar-list ${currentPage === "posts" ? "nav-sidebar-current" : ""}`} to={"/posts"}>
            <FontAwesomeIcon icon={faComment} size="sm" fixedWidth /> Posts
          </Link>
          <Link className={`nav-sidebar-list ${currentPage === "follow" ? "nav-sidebar-current" : ""}`} to={"/follow"}>
            <FontAwesomeIcon icon={faUsers} size="sm" fixedWidth /> Follow
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;