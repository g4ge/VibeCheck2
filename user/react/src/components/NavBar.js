
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "libs/Context";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function NavBar({ currentPage }) {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();

  return (
    <div>
      <div className="nav-sidebar">

        {/* user profile photo and name */}
        <div className="nav-info-wrap">
          <img className="nav-avatar" src={avatars[authUser.avatar]} alt="Avatar"></img>
          <div className="mt-3" style={{fontWeight: "500"}}>{authUser.name}</div>
          <div className="mt-1" style={{fontSize: "12px", opacity: "0.7"}}>{authUser.username}</div>
        </div>

        {/* app navigation links */}
        <div className="mt-5">
          <Link className={`nav-sidebar-list ${currentPage === "profile" ? "nav-sidebar-current" : ""}`} to={"/profile"}>
            <FontAwesomeIcon icon={faUser} size="sm" fixedWidth /> Profile
          </Link>
          <Link className={`nav-sidebar-list ${currentPage === "posts" ? "nav-sidebar-current" : ""}`} to={"/posts"}>
            <FontAwesomeIcon icon={faComment} size="sm" fixedWidth /> Posts
          </Link>
          <Link className={`nav-sidebar-list ${currentPage === "search" ? "nav-sidebar-current" : ""}`} to={"/search"}>
            <FontAwesomeIcon icon={faSearch} size="sm" fixedWidth /> Search
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBar;