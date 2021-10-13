import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function User() {
  return (
    <div>
      <div className="page-title">| User</div>
      <div className="page-subtitle">Manage user account and view user statistics.</div>
      
      <div className="row mt-3">
        <div className="col-sm-4">
          <Link className="dashboard-link" to={"/user/1/account"}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faUser} size="xs" fixedWidth /> Account
            </div>
          </Link>
        </div>
        <div className="col-sm-4">
          <Link className="dashboard-link" to={"/user/1/following"}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faUserPlus} size="xs" fixedWidth /> Following 
            </div>
          </Link>
        </div>
        <div className="col-sm-4">
          <Link className="dashboard-link" to={"/user/1/time"}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faClock} size="xs" fixedWidth /> Time Spent 
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default User;