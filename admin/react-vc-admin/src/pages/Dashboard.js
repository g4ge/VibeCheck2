import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function Dashboard() {
  return (
    <div>
      <div className="page-title">| Dashboard</div>
      
      <div className="row mt-3">
        <div className="col-sm-6">
          <Link className="dashboard-link" to={"/user"}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faUser} size="xs" fixedWidth /> User
            </div>
          </Link>
        </div>
        <div className="col-sm-6">
          <Link className="dashboard-link" to={"/post"}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faComment} size="xs" fixedWidth /> Post 
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;