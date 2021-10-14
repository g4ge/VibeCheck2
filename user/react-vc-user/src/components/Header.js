import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { useUserContext } from "libs/Context";
import { removeAuthUser } from "data/AuthUserRepository";
import Logo from "images/logo-vibecheck.png";
import { updateUsageUponLogout } from "data/UsageRepository";
import "App.css";

function Header({ history, isSignedIn, type }) {
  const { authUser, setAuthUser } = useUserContext();

  // remove authenticated user
  const logout = async () => {
    await updateUsageUponLogout(authUser.id); // update user daily usage in db
    setAuthUser(null); // remove auth user in context
    removeAuthUser(); // remove auth user in localStorage
    history.push("/"); // log user out to landing page
  }

  return (
    <div>
      <nav className={`navbar navbar-expand navbar-light fixed-top ${type}-header`}>
        <div className="container">
          {/* if user is signed in, go to profile page, otherwise go to landing page */}
          <Link className={`navbar-brand ${type}-navbar-brand`} to={isSignedIn ? "/profile" : "/"}>
            <img className="header-logo" src={Logo} alt="Logo"></img>  
            VibeCheck
          </Link>
            
          <ul className="navbar-nav ml-auto">
            {/* if user is signed in, show logout link, otherwise show sign in & sign up links */}
            {isSignedIn ? (
              <li className="nav-item" onClick={logout}>
                <Link className="nav-link general-nav-link" to={"/"}>Logout</Link>
              </li>
            ) : (
              <Fragment>
                <li className="nav-item">
                  <Link className={`nav-link ${type}-nav-link`} style={{marginRight: "40px"}} to={"/signin"}>Sign In</Link>
                </li>
                
                <li className="nav-item">
                  <Link className={`nav-link ${type}-nav-link`} to={"/signup"}>Sign up</Link>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Header);