import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "components/Header";
import NavBar from "components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { getFollowedUsers, getUnfollowedUsers } from "data/FollowRepository";
import { useUserContext } from "libs/Context";
import AvatarBook from "images/avatars/book.png";
import AvatarCat from "images/avatars/cat.png";
import AvatarCoffee from "images/avatars/coffee.png";
import AvatarConsole from "images/avatars/console.png";
import AvatarUfo from "images/avatars/ufo.png";
import AvatarUser from "images/avatars/user.png";
import "App.css";

function Follow() {
  const avatars = { AvatarBook, AvatarCat, AvatarCoffee, AvatarConsole, AvatarUfo, AvatarUser };
  const { authUser } = useUserContext();
  const [toFollow, setToFollow] = useState(true);
  const [following, setFollowing] = useState(false);
  const [unfollowedUsers, setUnfollowedUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  useEffect(() => {
    const axiosGetFollowedUsers = async () => {
      setFollowedUsers(await getFollowedUsers(authUser.id));
      setUnfollowedUsers(await getUnfollowedUsers(authUser.id));
    }  
    axiosGetFollowedUsers();
  }, [authUser.id]);

  return (
    <div>
      <Header isSignedIn={true} type={"general"}/>
      
      <div className="content-wrap">
        <div className="content-container">
          <NavBar currentPage="follow"/>

          <div className="content">
            <div className="po-wrap mb-4">
              <h5 className="form-title mb-3">| Follow new friends</h5>

              {/* users tab selection */}
              <div className="row">
                <div className="col-md-6 mt-3">
                  <button className={`custom-btn flw-tab ${toFollow && "flw-tab-current"}`} onClick={() => {setToFollow(true); setFollowing(false);}}>
                    <FontAwesomeIcon icon={faUserPlus} size="xs" fixedWidth /> &nbsp;Users you can follow
                  </button>
                </div>
                <div className="col-md-6 mt-3">
                  <button className={`custom-btn flw-tab ${following && "flw-tab-current"}`} onClick={() => {setToFollow(false); setFollowing(true);}}>
                    <FontAwesomeIcon icon={faUserCheck} size="xs" fixedWidth /> &nbsp;Users you are following
                  </button>   
                </div>
              </div>

              {/* lists of users that can be followed */}
              {toFollow && unfollowedUsers.length > 0 &&
                <div className="row mt-4">
                  <hr />
                  {unfollowedUsers.map(user =>
                    <div key={user.id} className="col-md-6 mt-3">
                      <Link className="username-link" to={`/profile/${user.id}`}>
                        <div className="custom-btn flw-user-tab">
                          <div className="flw-avatar-wrap">
                            <img className="flw-avatar" src={avatars[user.avatar]} alt="Avatar"></img>
                          </div>  
                          <div className="flw-username">
                            {user.username}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              }

              {/* lists of users that are followed */}
              {following && followedUsers.length > 0 &&
                <div className="row mt-4">
                  <hr />
                  {followedUsers.map(user =>
                    <div key={user.user.id} className="col-md-6 mt-3">
                      <Link className="username-link" to={`/profile/${user.user.id}`}>
                        <div className="custom-btn flw-user-tab">
                          <div className="flw-avatar-wrap">
                            <img className="flw-avatar" src={avatars[user.user.avatar]} alt="Avatar"></img>
                          </div>  
                          <div className="flw-username">
                            {user.user.username}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              }

            </div>          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Follow;