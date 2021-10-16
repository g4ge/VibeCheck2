import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faComments } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function PostDashboard() {
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="page-title">
            <Link className="dashboard-link" to={"/"}>
              <div className="icon-btn back-btn">
                <FontAwesomeIcon icon={faChevronLeft} size="xs" fixedWidth />
              </div>
            </Link>
            {" "}| Post Management
          </div>  
        </div>
        <div className="col-6">
          <div className="page-title-right">
            <Link className="dashboard-link" to={"/post/all"}>
              <div className="custom-btn view-posts-btn">
              <FontAwesomeIcon icon={faComments} size="xs" fixedWidth /> View All Posts
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="page-subtitle">Most popular post of all the posts made on the VC website</div>
    
    </div>
  );
}

export default PostDashboard;