import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { getOneUser } from "data/UserRepository";
import "App.css";

function User() {
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadData = async () => {  
      // get the user data
      const user = await getOneUser(parseInt(id));
      setUser(user);    
    }
    loadData();
  }, [id])

  return (
    <div>
      <div className="page-title">| User</div>
      <div className="page-subtitle">Manage user account and view user statistics</div>
      
      <div className="mt-4">Current selected user: <strong><i>{user.username}</i></strong></div>
      <div className="row">
        <div className="col-lg-4">
          <Link className="dashboard-link" to={{ pathname: `/user/${user.id}/account` }}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faUser} size="xs" fixedWidth /> Account
            </div>
          </Link>
        </div>
        <div className="col-lg-4">
          <Link className="dashboard-link" to={{ pathname: `/user/${user.id}/following` }}>
            <div className="dashboard-tab mt-3">
              <FontAwesomeIcon icon={faUserPlus} size="xs" fixedWidth /> Following 
            </div>
          </Link>
        </div>
        <div className="col-lg-4">
          <Link className="dashboard-link" to={{ pathname: `/user/${user.id}/time` }}>
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