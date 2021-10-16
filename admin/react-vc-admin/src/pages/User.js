import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faClock, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
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
      <div className="row">
        <div className="col-4">
          <div className="page-title">
            <Link className="dashboard-link" to={"/user"}>
              <div className="icon-btn back-btn">
                <FontAwesomeIcon icon={faChevronLeft} size="xs" fixedWidth />
              </div>
            </Link>
            {" "}| User
          </div>
        </div>
        <div className="col-8">
          <div className="page-title-right">Current viewing user: <strong><i>{user.username}</i></strong></div>
        </div>
      </div>
      <div className="page-subtitle">Manage user account and view user statistics</div>
      
      <div className="row">
        <div className="col-lg-4">
          <Link className="dashboard-link" to={`/user/${user.id}/account`}>
            <div className="dashboard-tab mt-3">
              <div className="dashboard-tab-icon"><FontAwesomeIcon icon={faUser} fixedWidth /></div>
              <div>Account</div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4">
          <Link className="dashboard-link" to={`/user/${user.id}/following`}>
            <div className="dashboard-tab mt-3">
              <div className="dashboard-tab-icon"><FontAwesomeIcon icon={faUserPlus} fixedWidth /></div>
              <div>Following</div>
            </div>
          </Link>
        </div>
        <div className="col-lg-4">
          <Link className="dashboard-link" to={`/user/${user.id}/time`}>
            <div className="dashboard-tab mt-3">
              <div className="dashboard-tab-icon"><FontAwesomeIcon icon={faClock} fixedWidth /></div>
              <div>Time Spent</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default User;