import React, { useState, useEffect } from "react";
import Header from "components/Header";
import NavBar from "components/NavBar";
import SinglePost from "components/SinglePost";
import { getAllPosts } from "data/PostRepository";
import PostCreateForm from "components/PostCreateForm";
import "App.css";

function Posts() {
  const [posts, setPosts] = useState([]);

  // retrieve all posts (i.e. root posts excluding replies)
  const refreshPosts = () => {
    const axiosGetPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    }  
    axiosGetPosts();
  }

  useEffect(() => {
    refreshPosts();
  }, []);

  return (
    <div>
      <Header isSignedIn={true} type={"general"}/>
      
      <div className="content-wrap">
        <div className="content-container">
          <NavBar currentPage="posts"/>

          <div className="content">
            {/* new post input textarea */}
            <div className="po-wrap mb-4">
              <h5 className="form-title mb-4">| Write a new post</h5>
              <PostCreateForm isNewPost={true} refreshPosts={refreshPosts} />
            </div>

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
        </div>
      </div>
    </div>
  );
}

export default Posts;