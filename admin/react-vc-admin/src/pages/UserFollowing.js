import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getFollowers, getOneUser, getUsersFollowing } from "data/UserRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Doughnut, Bar } from 'react-chartjs-2';
import "App.css";

function UserFollowing() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const donutData = {
    labels: ['Followers', 'Following'],
    datasets: [
      {
        data: [followers.length, followings.length],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const donutOptions = { maintainAspectRatio: false };
  
  const barData = {
    labels: ['Followers', 'Following'],
    datasets: [
      {
        label: 'User Count',
        data: [followers.length, followings.length],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const barOptions = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  useEffect(() => {
    const loadData = async () => { 
      // get the user data
      const user = await getOneUser(parseInt(id));
      setUser(user); 

      // get all users that current user is following
      const followings = await getUsersFollowing(parseInt(id));
      console.log("following", followings);
      setFollowings(followings);

      // get all followers of the current user
      const followers = await getFollowers(parseInt(id));
      console.log("followers", followers);
      setFollowers(followers);
    }
    loadData();
  }, [id])

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <div className="page-title">| Following</div>
        </div>
        <div className="col-9">
          <div className="page-title-right">Current viewing user: <strong><i>{user.username}</i></strong></div>
        </div>
      </div>
      <div className="page-subtitle">Users following and followers statistics</div>

      {/* number of users following & followers */}
      <div className="row">
        <div className="col-md-6">
          <div className="flw-donut-bar-wrap mt-3"> 
            <Doughnut data={donutData} options={donutOptions} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="flw-donut-bar-wrap mt-3"> 
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* list of all following */}
      <hr className="mt-5" />
      <div className="page-subtitle">All following</div>
      {followings.length > 0 ? (
        <div className="row">
          {followings.map(user =>
            <div key={user.id} className="col-lg-3 mt-3">
              <Link className="dashboard-link" to={{ pathname: `/user/${user.id}` }}>
                <div className="custom-btn user-tab">
                  <div className="user-tab-username">{user.username}</div>
                </div>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="page-message">
          <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> User has no following.
        </div>
      )}

      {/* list of all followers */}
      <hr className="mt-5" />
      <div className="page-subtitle">All followers</div>
      {followers.length > 0 ? (
        <div className="row">
          {followers.map(user =>
            <div key={user.id} className="col-lg-3 mt-3">
              <Link className="dashboard-link" to={{ pathname: `/user/${user.id}` }}>
                <div className="custom-btn user-tab">
                  <div className="user-tab-username">{user.username}</div>
                </div>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="page-message">
          <FontAwesomeIcon icon={faExclamationCircle} size="sm" fixedWidth /> User has no followers.
        </div>
      )}
    </div>
  );
}

export default UserFollowing;