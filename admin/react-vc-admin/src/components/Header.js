import React from "react";
import { Link } from "react-router-dom";
import Logo from "images/logo-vibecheck.png";
import "App.css";

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light fixed-top admin-header">
        <div className="container">
          <Link className={`navbar-brand admin-navbar-brand`} to={"/"}>
            <img className="header-logo" src={Logo} alt="Logo"></img>  
            VibeCheck{" "}
            <span style={{fontSize: "14px", fontWeight: "300"}}> | Admin</span>
          </Link>
            
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link admin-nav-link" style={{marginRight: "40px"}} to={"/user"}>User</Link>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link admin-nav-link" to={"/post"}>Post</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;