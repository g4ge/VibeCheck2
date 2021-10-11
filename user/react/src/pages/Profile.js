import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from 'react-router-dom';
import Header from "components/Header";
import NavBar from "components/NavBar";
import { useUserContext } from "libs/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrashAlt, faEnvelope, faClock, faComment, faUserPlus, faUserEdit, faUserCheck, faCommentSlash } from "@fortawesome/free-solid-svg-icons";
import AccountDeleteForm from "components/AccountDeleteForm";
import AccountEditForm from "components/AccountEditForm";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import { getUser } from "data/UserRepository";
import { getAllUserPosts } from "data/PostRepository";
import { followUser, unfollowUser } from "data/FollowRepository";
import SinglePost from "components/SinglePost";
import "App.css";

function Profile() {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [follow, setFollow] = useState(false);

  const handleFollow = async () => {
    // follow or unfollow user
    if (follow)
      await unfollowUser(authUser.id, profile.id);
    else 
      await followUser(authUser.id, profile.id);
      
    // set following status
    setFollow(!follow);
  }
  

  const refreshProfile = useCallback(() => {
    // fetch user profile details from database via API
    const axiosGetUser = async () => {
      const user = await getUser(id);
      setProfile(user);
    }  
    axiosGetUser();
  }, [id])


  useEffect(() => {
    refreshProfile();

    // retrieve all posts/reeplies of the profile user
    const axiosGetPosts = async () => {
      const posts = await getAllUserPosts(parseInt(id));
      setPosts(posts);
    }  
    axiosGetPosts();
  }, [refreshProfile, id]);

  return (
    <div>
      <Header isSignedIn={true} type={"general"}/>
      
      <div className="content-wrap">
        <div className="content-container">
          <NavBar currentPage="profile" profileId={id} />

          <div className="content">
            <div className="pf-wrap">
              <div className="row">
                {/* profile photo */}
                <div className="col-md-3 pf-avatar-wrap">
                  <img className="pf-avatar" src={avatars[profile.avatar]} alt="Avatar"></img>
                </div>

                {/* profile info */}
                <div className="col-md-5 pf-info">
                  <p className="form-title" style={{fontSize: "20px", lineHeight: "30px"}}>{profile.username}</p>
                  <p className="pf-info-field"><FontAwesomeIcon icon={faUser} size="xs" fixedWidth /> &nbsp;{profile.name}</p>
                  <p className="pf-info-field"><FontAwesomeIcon icon={faEnvelope} size="xs" fixedWidth /> &nbsp;{profile.email}</p>
                  <p className="pf-info-field"><FontAwesomeIcon icon={faClock} size="xs" fixedWidth /> &nbsp;Joined on {profile.joinedDate}</p>
                </div>

                <div className="col-md-4">
                  <div className="pf-btns-wrap">
                    {/* profile posts button */}
                    <button type="button" className="icon-btn pf-edit-btn" onClick={() => {setShowEdit(false); setShowDelete(false); setShowPosts(!showPosts);}}>
                      <FontAwesomeIcon icon={showPosts ? faCommentSlash : faComment} fixedWidth /> 
                    </button>

                    {/* profile follow button */}
                    {parseInt(id) !== authUser.id &&
                      <button type="button" className={`icon-btn ${follow ? "pf-follow-btn" : "pf-edit-btn"}`} onClick={handleFollow}>
                        <FontAwesomeIcon icon={follow ? faUserCheck : faUserPlus} fixedWidth /> 
                      </button>
                    }
                  
                    {/* profile edit and delete buttons */}
                    {parseInt(id) === authUser.id &&
                      <Fragment>
                        <button type="button" className="icon-btn pf-edit-btn" onClick={() => {setShowEdit(!showEdit); setShowDelete(false); setShowPosts(false);}}>
                          <FontAwesomeIcon icon={faUserEdit} fixedWidth /> 
                        </button>
                        <button type="button" className="icon-btn pf-trash-btn" onClick={() => {setShowEdit(false); setShowDelete(!showDelete); setShowPosts(false);}}>
                          <FontAwesomeIcon icon={faTrashAlt} fixedWidth /> 
                        </button>
                      </Fragment>
                    }
                  </div>
                </div>
              </div>
              
              {/* display selected form */}
              {showEdit && <AccountEditForm profile={profile} refreshProfile={refreshProfile} />}
              {showDelete && <AccountDeleteForm profile={profile} />}
            </div>

            {/* display all user posts and replies */}
            {showPosts && 
              <Fragment>
                {/* display each post in reverse chronological order */}
                {posts.length > 0 &&
                  <div className="all-po-wrap">
                    {posts.map(post =>
                      <div key={post.id} className="po-wrap mt-3">
                        <SinglePost post={post} includeOtherUsers={false} />
                      </div>
                    )}
                  </div>
                }
              </Fragment>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;