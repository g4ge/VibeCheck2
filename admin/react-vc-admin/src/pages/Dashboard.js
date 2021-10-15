import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function MainDashboard() {
  return (
    <div>
      <div className="page-title">| Dashboard</div>
      <div className="page-subtitle">Manage and view the user and post statistics</div>
      
      <div className="row mt-3">
        <div className="col-sm-6">
          <Link className="dashboard-link" to={"/user"}>
            <div className="dashboard-tab mt-3">
              <div className="dashboard-tab-icon"><FontAwesomeIcon icon={faUser} fixedWidth /></div>
              <div>User</div>
            </div>
          </Link>
        </div>
        <div className="col-sm-6">
          <Link className="dashboard-link" to={"/post"}>
            <div className="dashboard-tab mt-3">
              <div className="dashboard-tab-icon"><FontAwesomeIcon icon={faComment} fixedWidth /></div>
              <div>Post</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;