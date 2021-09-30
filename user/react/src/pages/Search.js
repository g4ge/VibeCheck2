import React, { useState } from "react";
import Header from "components/Header";
import NavBar from "components/NavBar";
import SinglePost from "components/SinglePost";
import PostSearchForm from "components/PostSearchForm";
import { getPostsByIds, orderPostsByTime } from "data/PostsRepository";
import "App.css";

function Search() {
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const [includeOtherUsers, setIncludeOtherUsers] = useState(false);

  const refreshPosts = (userPostsAndReplies = null, hasOtherUsers = true, searchedPostIds = postIds) => {
    let searchedPosts = [];

    if (hasOtherUsers) {
      /* store relevant post IDs so that updated posts can be retrieved from local storage again 
      /* based on the IDs if any of them is edited/deleted */
      setPostIds(searchedPostIds);
      // retrieve relevant posts from local storage based on provided post IDs
      searchedPosts = getPostsByIds(searchedPostIds);
    } else {
      /* since post cannot be edited/replied/deleted with hasOtherUsers option disabled and replies
      /* are made into separated posts, posts are retrieved directly by get functions in child component */
      searchedPosts = userPostsAndReplies;
    }
    setPosts(orderPostsByTime(searchedPosts));
    setIncludeOtherUsers(hasOtherUsers);
  }

  return (
    <div>
      <Header isSignedIn={true} type={"general"}/>
      
      <div className="content-wrap">
        <div className="content-container">
          <NavBar currentPage="search"/>

          <div className="content">
            {/* search input field */}
            <div className="po-wrap mb-4">
              <h5 className="form-title mb-4">| Search posts/replies</h5>
              <PostSearchForm refreshPosts={refreshPosts} />
            </div>

            {/* display each post in reverse chronological order */}
            {posts.length > 0 &&
              <div className="all-po-wrap">
                {posts.map(post =>
                  <div key={post.id} className="po-wrap mb-3">
                    <SinglePost post={post} refreshPosts={refreshPosts} includeOtherUsers={includeOtherUsers} />
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

export default Search;