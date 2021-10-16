import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { getAllPosts } from "data/PostRepository";
import SinglePost from "components/SinglePost";
import "App.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  // retrieve all posts (i.e. root posts excluding replies)
  const refreshPosts = () => {
    const loadData = async () => {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    }  
    loadData();
  }

  useEffect(() => {
    refreshPosts();
  }, []);

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
      <div className="page-subtitle mb-4">View and manage all posts</div>

      {/* display each post in reverse chronological order */}
      {posts.length > 0 &&
        <div className="all-po-wrap">
          {posts.map(post =>
            <div key={post.id} className="po-wrap mb-3">
              <SinglePost post={post} refreshPosts={refreshPosts} />
            </div>
          )}
        </div>
      }
    
    </div>
  );
}

export default Posts;