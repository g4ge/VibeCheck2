import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "App.css";

function Posts() {
  return (
    <div>
      <div className="page-title">
        <Link className="dashboard-link" to={"/post"}>
          <div className="icon-btn back-btn">
            <FontAwesomeIcon icon={faChevronLeft} size="xs" fixedWidth />
          </div>
        </Link>
        {" "}| All Posts
      </div>  
      <div className="page-subtitle">View and manage all posts</div>
    
    </div>
  );
}

export default Posts;